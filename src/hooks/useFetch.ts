import { useEffect, useReducer, useRef } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched'
  data?: T,
  headers?: any,
  error?: string
}
interface Cache<T> {
  [url: string]: T
}
// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
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
  }
  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'fetching' }
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload }
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
            const getData = async (getUrl: string): Promise<AxiosResponse<any>> => {
                const getDataLinkSubstring = (linkText:string, startText: string, endText:string): string => {
                    return linkText.substring(
                    linkText.lastIndexOf(startText) + 1, 
                    linkText.lastIndexOf(endText));
                }

                const generateLinkObject = (headerLinks:string):Map<string, string> => {
                    const linksText = headerLinks.split(',');
                    const links = new Map<string, string>();
                    linksText.map((link: string) => {
                        const key = getDataLinkSubstring(link, '="', '"').replace('"', '');
                        console.log(key)
                        links.set(key,  getDataLinkSubstring(link, "<", ">"))
                    })
                    return links;
                }

                const response = await axios(getUrl, options)
                const headers = response.headers
                const links = generateLinkObject(headers.link);

                console.log(links)
                if(getUrl != links.get('last')){
                    const next = links.get('next')
                    console.log('got '+getUrl+ ' getting ' + next)
                    if(next){
                        const nextResponse = await getData(next);
                        response.data.push(...nextResponse.data)
                    }
                }
                return response;
            }

          const response = await getData(url);
          
          cache.current[url] = response.data
          if (cancelRequest.current) return
          dispatch({ type: 'success', payload: response.data })
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