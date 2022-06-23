import defaultOptions from './defaultOptions'
import { useErrorStore, useTransactionStore } from "../../store";

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

export const getAllLists = async (id: string): Promise<Response> => {
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

export const createNewList = async (id: number, title: string, media: any = {}): Promise<Response> => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  let mediaItem = []
  if (Object.entries(media).length > 0) {
    mediaItem = media
  }

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/lists/create`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      userId: id,
      title, 
      media: mediaItem,
    }),
  });
  transactionStore.setIsLoading(false);
  return await response.json();
}

export const addToList = async (listId: number | null, mediaItem: {}): Promise<Response> => {
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

export const updateListName = async (uid: string, listId: number | null, name: string): Promise<Response> => {
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



export const deleteList = async (listId: number): Promise<Response> => {
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
