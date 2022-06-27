import defaultOptions from './defaultOptions'
import { apiFetch } from '../api'

export interface List {
  authorId: string
  id: number
  title: string
}

export type Media = {
  id: number
  listId: number
  createdAt: string
  updatedAt: string
  mediaId: number
  imageUrl: string
  type: string
  title: string
}

export const getAllLists = (id: string) => {
  return apiFetch<List[]>(`/lists/user/${id}`, { ...defaultOptions })
}

export const createNewList = (id: number, title: string, media: any = {}) => {
  let mediaItem = []
  if (Object.entries(media).length > 0) {
    mediaItem = media
  }

  return apiFetch<List[]>(`/lists/create`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      userId: id,
      title,
      media: mediaItem,
    }),
  })
}

export const addToList = (listId: number | null, mediaItem: {}) => {
  return apiFetch<List>(`lists/${listId}`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      mediaItem: mediaItem,
      listId: listId,
    }),
  })
}

export const updateListName = (uid: string, listId: number | null, name: string) => {
  return apiFetch<List>(`lists/${listId}`, {
    method: 'PATCH',
    ...defaultOptions,
    body: JSON.stringify({ uid, listId, name }),
  })
}

export const deleteList = (listId: number) => {
  return apiFetch<List>(`lists/${listId}`, {
    method: 'DELETE',
    ...defaultOptions,
  })
}
