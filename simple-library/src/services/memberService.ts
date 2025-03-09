import prisma from "../config/prisma";

// get all members
export const getAllMembers = async () => {
  return await prisma.member.findMany({
    include: {
      borrowedBooks: true,
    },
  });
};

// get member by id
export const getMemberById = async (id: number) => {
  return await prisma.member.findUnique({
    where: {
      id,
    },
    include: {
      borrowedBooks: true,
    },
  });
};

// create member
export const createMember = async (code: string, name: string) => {
  return await prisma.member.create({
    data: {
      code,
      name,
    },
  });
};

//update member
export const updateMember = async (id: number, name: string) => {
  return await prisma.member.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

// delete member
export const deleteMember = async (id: number) => {
  return await prisma.member.delete({
    where: {
      id,
    },
  });
};
