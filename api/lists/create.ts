import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { userId, title, media }: { userId: string, title: string, media: never } = request.body

  if (!title) {
    response.status(422).json('Title is a required field')
  }

  try {
    const prisma = new PrismaClient();
    const id = userId.toString();
    const list = await prisma.lists.create({
      data: {
          title: title,
          userId: id,
          media: {
              create: media,
          }
      },
      include: { media: true }
    })

    response.status(200).json(list)
  } catch (error) {
    console.log(error)
  }
}