import type { ContentsItem } from '~/types/typesContents'
import type { Ref } from 'vue'
import { ref } from 'vue'

export function useFetchItem(item_id: string | string[]) {
  const pb = usePocketBase()
  const id = Array.isArray(item_id) ? item_id[0] || '' : item_id

  const item: Ref<ContentsItem | undefined> = ref<ContentsItem>()
  const isLoading = ref<boolean>(true)

  const fetchItem = async () => {
    isLoading.value = true

    try {
      const record: ContentsItem = await pb.collection('contents').getOne(id, {
        sort: '-created',
        expand: 'idol,group,uploader,tag,set,collections,likes',
      })

      item.value = record
    }
    catch (error) {
      console.error('Error fetching records:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    item,
    fetchItem,
    isLoading,
  }
}
