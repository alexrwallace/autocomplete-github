import { useEffect, useReducer, useRef } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched'
  data?: T,
  headers?: any,
  error?: string
}
interface GenericWithHeader<T> {
    data?: T,
    headers?: any,
}
interface Cache<T> {
  [url: string]: GenericWithHeader<T>
}
// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: GenericWithHeader<T> }
  | { type: 'failure'; payload: string }
function useFetch<T = unknown>(
  url?: string,
  options?: AxiosRequestConfig,
): State<T> {
  const cache = useRef<Cache<T>>({})
  const cancelRequest = useRef<boolean>(false)
  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
    headers: undefined,
  }
  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' }
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload.data, headers: action.payload.headers }
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  useEffect(() => {
    if (!url) {
      return
    }
    const fetchData = async () => {
      dispatch({ type: 'request' })
      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] })
      } else {
        try {
          const response = await axios(url, options)
          console.log(response.headers);
          cache.current[url] = { data: response.data, headers: response.headers }
          if (cancelRequest.current) return
          dispatch({ type: 'success', payload: { data: response.data, headers: response.headers } })
        } catch (error) {
          if (cancelRequest.current) return
          dispatch({ type: 'failure', payload: error.message })
        }
      }
    }
    fetchData()
    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  return state
}
export default useFetch