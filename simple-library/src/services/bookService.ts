import prisma from "../config/prisma";

// get all books
export const getAllBooks = async () => {
  return await prisma.book.findMany();
};

// get book by id
export const getBookById = async (id: number) => {
  return await prisma.book.findUnique({ where: { id } });
};

// create book
export const createBook = async (code: string, title: string, author: string, stock: number) => {
  return await prisma.book.create({
    data: { code, title, author, stock },
  });
};

// update book
export const updateBook = async (id: number, title: string, author: string, stock: number) => {
  return await prisma.book.update({
    where: { id },
    data: { title, author, stock },
  });
};

// delete book
export const deleteBook = async (id: number) => {
  return await prisma.book.delete({ where: { id } });
};
