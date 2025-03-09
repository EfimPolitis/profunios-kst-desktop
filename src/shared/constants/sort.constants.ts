import {
  EApplicationSort,
  EEventSort,
  ENewsSort,
  EUserSort,
  ISortItem
} from '@shared/types/query.types'

export enum EnumSort {
  ALPHABETIC = 'alphabetic',
  DATE = 'date',
  PLACES = 'places',
  VIEWS = 'views',
  ROLE = 'role',
  STATUS = 'status',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export const eventSortList: ISortItem[] = [
  {
    message: 'По алфавиту',
    keys: {
      asc: EEventSort.ALPHABETIC_ASC,
      desc: EEventSort.ALPHABETIC_DESC
    }
  },
  {
    message: 'По дате проведения',
    keys: {
      asc: EEventSort.DATE_ASC,
      desc: EEventSort.DATE_DESC
    }
  },
  {
    message: 'По кол-ву мест',
    keys: {
      asc: EEventSort.PLACES_ASC,
      desc: EEventSort.PLACES_DESC
    }
  }
]

export const newsSortList: ISortItem[] = [
  {
    message: 'По алфавиту',
    keys: {
      asc: ENewsSort.ALPHABETIC_ASC,
      desc: ENewsSort.ALPHABETIC_DESC
    }
  },
  {
    message: 'По дате публикации',
    keys: {
      asc: ENewsSort.CREATED_AT_ASC,
      desc: ENewsSort.CREATED_AT_DESC
    }
  },
  {
    message: 'По кол-ву просмотров',
    keys: {
      asc: ENewsSort.VIEWS_ASC,
      desc: ENewsSort.VIEWS_DESC
    }
  }
]

export const userSortList: ISortItem[] = [
  {
    message: 'По алфавиту',
    keys: {
      asc: EUserSort.ALPHABETIC_ASC,
      desc: EUserSort.ALPHABETIC_DESC
    }
  },
  {
    message: 'По дате создания',
    keys: {
      asc: EUserSort.CREATED_AT_ASC,
      desc: EUserSort.CREATED_AT_DESC
    }
  },
  {
    message: 'По дате обновления',
    keys: {
      asc: EUserSort.UPDATED_AT_ASC,
      desc: EUserSort.UPDATED_AT_DESC
    }
  }
]

export const applicationSortList: ISortItem[] = [
  {
    message: 'По кол-ву мест',
    keys: {
      asc: EApplicationSort.PLACES_ASK,
      desc: EApplicationSort.PLACES_DESC
    }
  },
  {
    message: 'По дате',
    keys: {
      asc: EApplicationSort.CREATED_AT_ASC,
      desc: EApplicationSort.CREATED_AT_DESC
    }
  }
]
