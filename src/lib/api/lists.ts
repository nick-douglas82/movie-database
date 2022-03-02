import http from '@/http-common'
import { AxiosError, AxiosResponse } from 'axios'
import defaultOptions from './defaultOptions'

export type List = {
  authorId: string
  id: number
  title: string
  media: []
}

export type MediaResponse = {
  createdAt: string
  id: number
  listId: number
  mediaId: number
  updatedAt: string
}

export const getAllLists = (uid: string) => {
  return http.get<List[]>('/lists', {
    params: {
      userId: uid,
    },
  })
}

export const createList = (uid: string, title: string, mediaId: number) => {
  return api<List>('/list', {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      userId: uid,
      title: title,
      mediaId: mediaId,
    }),
  })
}

export const addToList = (listId: number | null, mediaId: number) => {
  return api<MediaResponse>(`/list/${listId}`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({
      mediaId: mediaId,
      listId: listId,
    }),
  })
  // return http.post<MediaPostResponse>(`/list/${listId}`, {
  //   body: {
  //     mediaId: mediaId,
  //     listId: listId,
  //   },
  // })
}

export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const apiUrl = `http://localhost:8080/api${url}`
  const response = await fetch(apiUrl, {
    ...init,
  })
  return await response.json()
}
