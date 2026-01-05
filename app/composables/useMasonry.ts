export function useMasonry<T>(items: Ref<T[]>, columnCount: Ref<number>) {
    const columns = computed(() => {
        // Create 'N' empty arrays
        const cols = Array.from({ length: columnCount.value }, () => [] as T[])

        // Distribute items: Item 0 -> Col 0, Item 1 -> Col 1, Item 2 -> Col 2, Item 3 -> Col 0...
        items.value.forEach((item, index) => {
            cols[index % columnCount.value].push(item)
        })

        return cols
    })

    return { columns }
}