import prisma from "../config/prisma";
import { addDays, isAfter } from "date-fns";

// borrow book
export const borrowBook = async (memberId: number, bookId: number) => {
  const member = await prisma.member.findUnique({
    where: { id: memberId },
    include: {
      borrowedBooks: {
        where: { returnDate: null },
      },
    },
  });

  if (!member) throw new Error("Member not found");

  // Cek apakah member dalam penalti
  const now = new Date();
  const hasPenalty = member.borrowedBooks.some((borrow) => borrow.penaltyUntil && isAfter(now, borrow.penaltyUntil));

  if (hasPenalty) throw new Error("Member is under penalty and cannot borrow books");

  // Cek apakah sudah meminjam 2 buku
  if (member.borrowedBooks.length >= 2) throw new Error("Member cannot borrow more than 2 books");

  const book = await prisma.book.findUnique({ where: { id: bookId } });

  if (!book) throw new Error("Book not found");
  if (book.stock < 1) throw new Error("Book is currently not available");

  // Simpan peminjaman dan kurangi stok buku
  return await prisma.$transaction(async (prisma) => {
    await prisma.book.update({
      where: { id: bookId },
      data: { stock: { decrement: 1 } }, // Kurangi stok buku
    });

    return await prisma.borrowing.create({
      data: {
        memberId,
        bookId,
        borrowDate: now,
      },
    });
  });
};

// return book
export const returnBook = async (memberId: number, bookId: number) => {
  const borrow = await prisma.borrowing.findFirst({
    where: { memberId, bookId, returnDate: null },
  });

  if (!borrow) throw new Error("This book was not borrowed by the member");

  const now = new Date();
  let penaltyUntil: Date | null = null;

  // Jika lebih dari 7 hari, tambahkan penalti
  if (isAfter(now, addDays(borrow.borrowDate, 7))) {
    penaltyUntil = addDays(now, 3);
  }

  // Kembalikan stok buku dan update peminjaman
  return await prisma.$transaction(async (prisma) => {
    await prisma.book.update({
      where: { id: bookId },
      data: { stock: { increment: 1 } }, // Tambah stok buku
    });

    return await prisma.borrowing.update({
      where: { id: borrow.id },
      data: {
        returnDate: now,
        penaltyUntil,
      },
    });
  });
};
