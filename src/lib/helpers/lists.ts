import { useListsStore, useUserStore } from '@/store'
import { getAllLists } from '@/lib/api/lists'

export const getListsPopulateStore = () => {
  const listsStore = useListsStore()
  const userStore = useUserStore()

  if (listsStore.lists.length === 0) {
    if (userStore.id) {
      getAllLists(userStore.id.toString()).then(lists => {
        listsStore.lists = lists
      })
    }
  }
}
