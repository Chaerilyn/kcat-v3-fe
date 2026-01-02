import { onMounted, onUnmounted, ref } from 'vue'

export function useWindowSize() {
  const isMobile = ref(false)

  const updateWindowSize = () => {
    isMobile.value = window.innerWidth < 712
  }

  onMounted(() => {
    // Initialize on mount
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return { isMobile }
}
