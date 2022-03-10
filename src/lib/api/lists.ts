import http from '@/http-common'
import { MediaItem } from '../format'
import defaultOptions from './defaultOptions'

export interface List {
  authorId: string
  id: number
  title: string
}

export type ListWithMedia = {
  authorId: string
  id: number
  title: string
  media: Array<Media>
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

export const getAllLists = (uid: string) => {
  // return http.get<List[]>('/lists', {
  //   params: {
  //     userId: uid,
  //   },
  // })
  return api<ListWithMedia>(`/users/${uid}`, {
    method: 'GET',
    ...defaultOptions,
    // body: JSON.stringify({
    //   userId: uid,
    // }),
  })
}

export const createNewList = (uid: string, title: string) => {
  return api<List>('/list/new', {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      userId: uid,
      title: title,
    }),
  })
}

export const createListWithMedia = (uid: string, title: string, mediaItem: MediaItem) => {
  return api<ListWithMedia>('/list', {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      userId: uid,
      title: title,
      mediaItem: mediaItem,
    }),
  })
}

export const addToList = (listId: number | null, mediaItem: MediaItem) => {
  return api<Media>(`/list/${listId}`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      mediaItem: mediaItem,
      listId: listId,
    }),
  })
}

export const updateListName = (uid: string, listId: number | null, name: string) => {
  return api<List>(`/list/${listId}`, {
    method: 'PATCH',
    ...defaultOptions,
    body: JSON.stringify({
      userId: uid,
      title: name,
      listId: listId,
    }),
  })
}

export const deleteList = (listId: number) => {
  return api<List>(`/list/${listId}`, {
    method: 'DELETE',
    ...defaultOptions,
    body: JSON.stringify({
      listId: listId,
    }),
  })
}

export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const apiUrl = `http://localhost:3000/api${url}`
  const response = await fetch(apiUrl, {
    ...init,
  })
  return await response.json()
}
