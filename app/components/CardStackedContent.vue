<script setup lang="ts">
import type { CollectionsItem } from '~/types/typesCollections'
import type { Group, Idol, Tag, Uploader } from '~/types/typesCommon'
import type { SetsItem } from '~/types/typesSets'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

const props = defineProps<{
  content: SetsItem | CollectionsItem
  isSet: boolean
}>()

const emit = defineEmits([
  'filtersApply',
])

type FilterValue = Idol | Group | Uploader | Tag

const filtersStore = useFiltersStore()
const toast = useToast()
const router = useRouter()
const config = useRuntimeConfig()

const getContentUrls = computed(() => {
  const contentField = props.isSet ? 'contents_via_set' : 'contents_via_collections'

  const expandObj = props.content?.expand as any
  if (!expandObj || !expandObj[contentField]) {
    return []
  }

  const items = expandObj[contentField].slice(0, 4)

  return items.map((item: any) => {
    const baseUrl = item.file
      ? `${config.public.hostUrl}/${item.collectionId}/${item.id}/${item.file}`
      : item.kpfhdFile

    const finalUrl = item.file
      ? `${baseUrl}?thumb=250x250`
      : baseUrl

    return {
      url: finalUrl,
      isVideo: isVideo(baseUrl),
    }
  })
})

function isVideo(file: string) {
  return file && /\.(mp4|webm|ogg)$/i.test(file)
}

function goToSingle(id: string) {
  localStorage.setItem('pageTitle', props.content.title)

  if (props.isSet) {
    router.push(`/set/${id}`)
  }
  else {
    router.push(`/collection/${id}`)
  }
}

function filtersApply(value: FilterValue, type: 'idol' | 'group' | 'uploader' | 'tag') {
  filtersStore.filtersReset()

  if (type === 'idol') {
    const idol = filtersStore.idols.find((idol: Idol) => idol.name === value.name)
    if (idol) {
      filtersStore.filters.idol.push(idol)
    }
  }
  else if (type === 'group') {
    const group = filtersStore.groups.find((group: Group) => group.name === value.name)
    if (group) {
      filtersStore.filters.group.push(group)
    }
  }
  else if (type === 'uploader') {
    const uploader = filtersStore.uploaders.find((uploader: Uploader) => uploader.name === value.name)
    if (uploader) {
      filtersStore.filters.uploader.push(uploader)
    }
  }
  else if (type === 'tag') {
    const tag = filtersStore.tags.find((tag: Tag) => tag.name === value.name)
    if (tag) {
      filtersStore.filters.tag.push(tag)
    }
  }

  filtersStore.filtersSave()

  emit('filtersApply')
}
</script>

<template>
  <div class="pt-3 pb-3 px-2 rounded-md bg-[#0f172a] relative stack-effect">
    <div class="flex items-center gap-2 mb-2">
      <div class="flex-1 truncate" @click="goToSingle(content.id)">
        <h3 class="hover:text-rose-400 cursor-pointer">
          {{ content.title }}
        </h3>
      </div>
      <div class="flex-shrink-0 flex gap-2">
        <div v-if="(content.expand as any)?.uploader" class="inline">
          <Tag
            v-for="uploader in (content.expand as any).uploader"
            :key="uploader.id"
            severity="success" rounded icon="pi pi-user" :value="uploader.name"
            class="select-none cursor-pointer hover:!bg-green-900" @click="filtersApply(uploader, 'uploader')"
          />
        </div>
        <div v-else-if="(content.expand as any)?.user" class="inline">
          <Tag
            v-for="user in (content.expand as any).user"
            :key="user.id"
            severity="success" rounded icon="pi pi-user" :value="user.name.split('#')[0]"
            class="select-none"
          />
        </div>
      </div>
    </div>
    <div class="cursor-pointer" @click="goToSingle(content.id)">
      <div v-if="!(content as any).cover">
        <div class="grid grid-cols-2 gap-4 hover:brightness-110 transition duration-300">
          <div v-for="(item, index) in getContentUrls" :key="index" class="w-full">
            <div v-if="item.isVideo">
              <video class="w-full h-auto rounded-md">
                <source :src="item.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else>
              <img class="w-full h-auto rounded-md" :src="item.url" alt="Content preview">
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <img class="w-full h-auto rounded-md" :src="(content as any).cover" alt="Content preview">
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-wrap flex-1">
        <Tag
          v-for="idol in (content.expand as any)?.idol"
          v-if="(content as any).idol" :key="idol.id"
          icon="pi pi-star" severity="warn" :value="idol.name"
          class="select-none cursor-pointer hover:!bg-orange-900 mr-2 mt-2" @click="filtersApply(idol, 'idol')"
        />
        <Tag
          v-for="group in (content.expand as any)?.group"
          v-if="(content as any).group" :key="group.id"
          icon="pi pi-at" severity="info" :value="group.name"
          class="select-none cursor-pointer hover:!bg-blue-900 mr-2 mt-2" @click="filtersApply(group, 'group')"
        />
        <Tag
          v-for="tag in (content.expand as any)?.tag"
          v-if="(content as any).tag" :key="tag.id"
          icon="pi pi-tags" severity="secondary" :value="tag.name"
          class="select-none cursor-pointer hover:!bg-zinc-700 mr-2 mt-2"
          @click="filtersApply(tag, 'tag')"
        />
      </div>
      <div v-if="content.created">
        <Tag
          id="p-custom-datetag"
          icon="pi pi-calendar" :value="new Date(content.created).toISOString().split('T')[0]"
          class="select-none mt-2" severity="secondary"
        />
      </div>
    </div>
  </div>
</template>

<style>
.p-speeddial-button {
  height: 26px !important;
  border-radius: 12px !important;
  background: var(--p-tag-primary-background) !important;
  border: none !important;
  color: var(--p-tag-primary-color) !important;
}

#p-like-button {
  position: absolute !important;
  bottom: 8px;
  right: 8px;
}

#p-custom-datetag {
  font-size: 8px !important;
  font-weight: 400;
  padding: 6.5px;
}

.stack-effect {
  position: relative;
  background: #0f172a;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
}

.stack-effect::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1e2841;
  border-radius: 8px;
  z-index: -1;
}

.stack-effect::before {
  transform: translate(2px, 2px);
}
</style>
