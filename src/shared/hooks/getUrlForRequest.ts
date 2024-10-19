import { IGetData } from '@shared/types/sort.types'

export const getUrlForRequest = (data: IGetData) => {
  const page = `page=${data.page + 1}`
  const search = data.search ? `search=${data.search}` : ''
  const sort = data?.sort?.value
    ? `sort=${data.sort.value}&type=${data.type}`
    : ''

  const url =
    search && sort
      ? `${page + '&' + search + '&' + sort}`
      : search
        ? `${page + '&' + search}`
        : sort
          ? `${page + '&' + sort}`
          : page

  return { url }
}
