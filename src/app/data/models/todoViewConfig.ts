export interface TodoViewConfig {
  sortOpt?: 'asc' | 'desc',
  showDone?: boolean,
  date?: Date,
  period?: 'week' | 'day',
  filterSectionsIDs?: Array<number>
}