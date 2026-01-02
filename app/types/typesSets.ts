import type * as Common from '~/types/typesCommon'
import type { ContentsItem } from '~/types/typesContents'

export interface SetsExpand {
  group: Common.Group[]
  idol: Common.Idol[]
  uploader: Common.Uploader[]
  contents_via_set: ContentsItem[]
}

export interface SetsItem extends Common.Item {
  title: string
  idol: string[] // relation
  group: string[] // relation
  uploader: string[] // relation
  expand: SetsExpand
}

export interface SetsResponse extends Common.Base {
  items: SetsItem[]
}
