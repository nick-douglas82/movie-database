import { VercelRequest, VercelResponse } from '@vercel/node'
import { getAllLists } from '../../lib/api'

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') {
    const userId = <string>request.query.id
    response.status(200).json(await getAllLists(userId))
  }
}
