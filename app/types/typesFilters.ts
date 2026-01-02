import type * as Common from '~/types/typesCommon'

export interface GroupResponse extends Common.Base {
  items: Common.Group[]
}

export interface IdolsResponse extends Common.Base {
  items: Common.Idol[]
}

export interface UploaderResponse extends Common.Base {
  items: Common.Uploader[]
}

export interface SavedFiltersResponse extends Common.Base {
  items: Common.SavedFilter[]
}

export interface TagsResponse extends Common.Base {
  items: Common.Tag[]
}

export interface Filters {
  idol: any[]
  group: any[]
  uploader: any[]
  filetype: any[]
  tag: any[]
  date: Date[]
  dateMode: any
  sort: any
}

export enum MostLikedModes {
  AllTime = 'alltime',
  OneYear = '1year',
  SixMonths = '6months',
  ThreeMonths = '3months',
  OneMonth = '1month',
  OneWeek = '1week',
}

// Re-export common types for convenience
export type { Group, Idol, SavedFilter, Tag, Uploader } from '~/types/typesCommon'
