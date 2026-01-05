// composables/useWindowSize.ts (or wherever it is defined)
import { onMounted, onUnmounted, ref } from 'vue'

export function useWindowSize() {
  const isMobile = ref(false)
  const width = ref(0) // 1. Add this state (0 defaults for SSR safety)

  const updateWindowSize = () => {
    width.value = window.innerWidth // 2. Update width
    isMobile.value = window.innerWidth < 712
  }

  onMounted(() => {
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return { isMobile, width } // 3. Export width
}
