import { MediaItem } from '../format'
import defaultOptions from './defaultOptions'
import { useErrorStore, useTransactionStore } from "../../store";

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

export const getAllLists = async (id: string) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/user/${id}`, {
    method: "GET",
    ...defaultOptions,
  });
  transactionStore.setIsLoading(false);
  return await response.json();
}

export const createNewList = async (id: number, title: string, media: any = {}) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/create`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      userId: id,
      title, 
      media,
    }),
  });
  transactionStore.setIsLoading(false);
  return await response.json();
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

export const addToList = async (listId: number | null, mediaItem: {}) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/${listId}`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      mediaItem: mediaItem,
      listId: listId,
    }),
  });
  transactionStore.setIsLoading(false);
  return await response.json();
}

export const updateListName = async (uid: string, listId: number | null, name: string) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/${listId}`, {
    method: "PATCH",
    ...defaultOptions,
    body: JSON.stringify({ uid, listId, name }),
  });
  transactionStore.setIsLoading(false);
  return await response.json();
}



export const deleteList = async (listId: number) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/${listId}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  transactionStore.setIsLoading(false);
  return await response.json();
}

export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const apiUrl = `${
    import.meta.env.DEV ? import.meta.env.VITE_LOCAL_DB_API : import.meta.env.VITE_PROD_DB_API
  }/api${url}`
  const response = await fetch(apiUrl, {
    ...init,
  })
  return await response.json()
}
