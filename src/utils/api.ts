import type WForm from '@/components/Form/WForm.vue'
import type WFormValidator from '@/components/Form/WFormValidator.vue'

import {Notify} from '@/utils/Notify'

import {get} from './utils'

type ErrorResponse<Response> = {
  [Key in 'detail' | 'non_field_errors' | keyof Response]?: Key extends 'detail' ? string : string[]
}

export class ApiError<Data extends RequestData = NonNullable<unknown>, ErrorData = ErrorResponse<Data>> extends Error {
  constructor(public readonly response: RequestResponse<ErrorData, Data>) {
    super()
  }
}

export class ApiErrorCancel<Data extends RequestData = NonNullable<unknown>> extends ApiError<Data, undefined> {
  constructor(response: RequestResponse<undefined, Data>) {
    super(response)
  }
}

export const handleApiError = <Error>(
  error: Error,
  form?: {invalidate: ComponentInstance<typeof WForm>['invalidate']} | null,
  field?: string,
  formValidator?: {invalidate: ComponentInstance<typeof WFormValidator>['invalidate']} | null,
): Promise<Error> => {
  if (error instanceof ApiError && !(error instanceof ApiErrorCancel)) {
    const caption = (error.response?.data as ErrorResponse<NonNullable<unknown>>)?.detail
      ?? error.response?.data?.non_field_errors?.join(', ')
      ?? (field ? (get<string[], Record<string, string[]>>(error.response?.data as Record<string, string[]> ?? {}, field))?.join(', ') : undefined)

    Notify.error({
      title: 'Error',
      caption: typeof caption === 'string' && caption.length < 200 ? caption : undefined,
    })

    if (formValidator && caption && caption.length < 200) formValidator.invalidate(caption)
    if (error.response?.data instanceof Object) form?.invalidate(error.response.data)
  }

  return Promise.reject(error)
}

export const encodeQueryParam = <T>(value: T): EncodeQueryParam<T> | undefined => {
  if (value === undefined) return undefined

  if (Array.isArray(value)) {
    if (value.length === 0) return undefined

    if (value.every(Number.isInteger) || value.every(item => typeof item === 'string')) return value.join(',') as EncodeQueryParam<T>
    else return JSON.stringify(value) as EncodeQueryParam<T>
  } else {
    if (value instanceof Object) return JSON.stringify(value) as EncodeQueryParam<T>
    else return `${ value }` as EncodeQueryParam<T>
  }
}

export const encodeQueryParams = <T>(params: T): EncodeQueryParams<T> => {
  const result = {} as EncodeQueryParams<T>

  for (const key in params) {
    const value = encodeQueryParam(params[key])

    if (value !== undefined) result[key] = value
  }

  return result
}
