<script setup lang="ts">
import type { PageState } from 'primevue/paginator'
import { MostLikedModes } from '~/types/typesFilters'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch } from 'vue'

definePageMeta({
  middleware: ['auth'],
})

const toast = useToast()
const router = useRouter()
const route = useRoute()

const filtersStore = useFiltersStore()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

const {
  isMobile,
  width,
} = useWindowSize()

const {
  items,
  itemsTotal,
  itemsCurrentPage,
  isLoading,
  fetchItems,
} = useFetchItems('collectionContents', route, settingsStore, authStore)

const firstItemIndex = computed(() => (itemsCurrentPage.value - 1) * Number(settingsStore.settings.contentCount))

const pageTitle = ref<string | null>(null)

const isBaseFiltersDialogVisible = ref(false)
function filtersOpen() {
  isBaseFiltersDialogVisible.value = true
}
const isBaseSettingsDialogVisible = ref(false)
function optionsOpen() {
  isBaseSettingsDialogVisible.value = true
}
const isMostLikedRowVisible = ref(false)
async function likedRowToggle() {
  if (filtersStore.mostLikedMode) {
    filtersStore.filtersReset()
  }
  else {
    filtersStore.setMostLikedMode(MostLikedModes.AllTime)
  }
  isMostLikedRowVisible.value = !isMostLikedRowVisible.value
  await onFiltersSettingsApply()
}

async function changePage(e: PageState) {
  const newPage = e.page + 1
  router.replace({
    query: {
      ...route.query,
      page: newPage.toString(),
    },
  })

  await fetchItems(newPage)
  isLoading.value = false
  window.scrollTo(0, 0)
}

async function onFiltersSettingsApply() {
  router.replace({ query: Object.fromEntries(new URLSearchParams(filtersStore.queryParams)) })
  itemsCurrentPage.value = 1
  await fetchItems(itemsCurrentPage.value)
  toast.add({ severity: 'success', summary: 'Success!', detail: 'Filters have been applied.', life: 1000 })
  isLoading.value = false
}

const colCount = computed(() => {
  const userSetting = parseInt(settingsStore.settings.columnCount) || 3
  
  if (width.value === 0) return userSetting 

  // Responsive Clamping logic:
  // If user wants 4 cols, but screen is < 640px, force 1.
  // If screen is < 1024px, allow max 2.
  if (width.value < 640) return 1 
  if (width.value < 1024) return Math.min(userSetting, 2) 
  if (width.value < 1280) return Math.min(userSetting, 3) 
  
  return userSetting
})
const { columns } = useMasonry(items, colCount)

onMounted(async () => {
  await filtersStore.refetchFiltersData()
  await settingsStore.settingsLoad()
  filtersStore.applyQueryFilters(route.query)
  filtersStore.filtersSave()

  pageTitle.value = localStorage.getItem('pageTitle')
  localStorage.removeItem('pageTitle')

  const initialPage = Number.parseInt(route.query.page as string) || 1
  itemsCurrentPage.value = initialPage
  await fetchItems(initialPage)
  isLoading.value = false
})

watch(
  () => route.query,
  async (newQuery, oldQuery) => {
    if (!newQuery.page && oldQuery.page) {
      itemsCurrentPage.value = 1
      await fetchItems(1)
      isLoading.value = false
    }
  },
  { deep: true },
)
</script>

<template>
  <div>
    <Filterbar @search="onFiltersSettingsApply" @filters-open="filtersOpen" @options-open="optionsOpen"
      @filters-apply="onFiltersSettingsApply" />

    <div>
      <div class="flex justify-start items-start">
        <NavigationBase class="flex-1" />
        <Button :label="isMobile ? 'Top' : 'Top Posts'"
          :icon="filtersStore.mostLikedMode ? 'pi pi-angle-double-up' : 'pi pi-angle-double-down'" severity="info"
          class="ml-2" @click="likedRowToggle" />
      </div>
    </div>

    <div v-if="isMostLikedRowVisible">
      <MostLikedRow @filters-apply="onFiltersSettingsApply" />
    </div>

    <div v-if="pageTitle">
      <div class="flex justify-center items-center mb-2">
        <h1 class="text-2xl text-rose-400">
          {{ pageTitle }}
        </h1>
      </div>
    </div>

    <div v-if="isLoading === true">
      <div class="flex justify-center items-center mt-16">
        <ProgressSpinner />
      </div>
    </div>
    <div v-else-if="items.length !== 0">
      <div class="flex gap-6 items-start w-full">
        <div v-for="(colItems, colIndex) in columns" :key="colIndex" class="flex flex-col flex-1 min-w-0 gap-6">
          <div v-for="content in colItems" :key="content.id">
            <div v-if="(content as any).file || (content as any).kpfhdFile">
              <CardBaseContent :content="content as any" @filters-apply="onFiltersSettingsApply" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center mt-16">
        <h1 class="text-2xl">
          No results.
        </h1>
      </div>
    </div>

    <div class="fixed p-4 mx-auto bottom-0 left-0 right-0 z-50 max-w-xl">
      <Paginator :first="firstItemIndex" :template="{
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput',
      }" :rows="+settingsStore.settings.contentCount" :total-records="itemsTotal" @page="changePage" />
    </div>

    <div v-if="isBaseFiltersDialogVisible">
      <DialogBaseFilters :is-visible="isBaseFiltersDialogVisible"
        @update:is-visible="isBaseFiltersDialogVisible = $event" @filters-apply="onFiltersSettingsApply" />
    </div>
    <div v-if="isBaseSettingsDialogVisible">
      <DialogBaseSettings :is-visible="isBaseSettingsDialogVisible"
        @update:is-visible="isBaseSettingsDialogVisible = $event" @settings-apply="onFiltersSettingsApply" />
    </div>
  </div>
</template>

<style>
.p-paginator {
  background: #222a3d !important;
  opacity: 0.95;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 3px 8px;
}
</style>
