import type * as Common from '~/types/typesCommon'
import type { ContentsItem } from '~/types/typesContents'

export interface CollectionsExpand {
  uploader: Common.Uploader[]
  contents_via_collection: ContentsItem[]
}

export interface CollectionsItem extends Common.Item {
  title: string
  file: string
  uploader: string[] // relation
  expand: CollectionsExpand
}

export interface CollectionsResponse extends Common.Base {
  items: CollectionsItem[]
}
