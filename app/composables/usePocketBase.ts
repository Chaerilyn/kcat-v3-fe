import PocketBase from 'pocketbase'

let pb: PocketBase | null = null

export function usePocketBase() {
  if (!pb) {
    const config = useRuntimeConfig()
    pb = new PocketBase(config.public.baseUrl as string)
  }
  return pb
}
