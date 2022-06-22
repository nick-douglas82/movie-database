import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    const prisma = new PrismaClient();
    const { listId, mediaItem } = request.body
    
    const result = await prisma.media.create({
      data: {
          mediaId: Number(mediaItem.id),
          listId: Number(listId),
          imageUrl: mediaItem.poster_path,
          type: mediaItem.media_type,
          title: mediaItem.title
      },
    })

    response.status(200).json(result)
  }

  if (request.method === 'DELETE') {
    const listId = request.query.id
    const prisma = new PrismaClient();
    const deleteMedia = prisma.media.deleteMany({
      where: {
        listId: Number(listId),
      },
    })

    const deleteListRequest = prisma.lists.delete({
        where: { id: Number(listId) },
    })

    const transaction = await prisma.$transaction([deleteMedia, deleteListRequest])
    response.status(200).json(transaction)
  }

  if (request.method === 'PATCH') {
    const prisma = new PrismaClient();
    const { uid, listId, name } = request.body
    const result = await prisma.lists.update({
      where: { id: Number(listId) },
      data: {
          title: name,
          userId: uid,
      },
      include: { media: true }
    })

    response.status(200).json(result)
  }
}