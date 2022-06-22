import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
  const prisma = new PrismaClient();
  const lists = await prisma.lists.findMany({
    orderBy: {
        id: 'asc'
    },
    where: {
        userId: request.query.id as string
    },
    include: { media: true }
  })
  response.status(200).json(lists)
}