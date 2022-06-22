import { PrismaClient } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  const prisma = new PrismaClient();
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const createNewUser = async (email: string, passwordhash: string, name: string) => {
  const prisma = new PrismaClient();
  return await prisma.user.create({
    data: {
      email,
      passwordhash,
      name,
    },
  });
};