import { useState, useEffect } from 'react'
import recordError from 'utils/recordError'

export default (url, defaultData = null) => {
  const [data, setData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false
    const fetchApi = async () => {
      setIsLoading(true)
      setError(null)

      let resp
      try {
        resp = await fetch(url)
      } catch (e) {
        if (!isCancelled) {
          setIsLoading(false)
          setError(e)
        }
      }

      let result
      try {
        result = await resp.json()
      } catch (e) {
        if (!isCancelled) {
          setIsLoading(false)
          setError(e)
        }
      }

      setIsLoading(false)
      if (!isCancelled) {
        if (!resp.ok) {
          setError(result)
          recordError('useApi', JSON.stringify(result))
        } else {
          setData(result.data)
        }
      }
    }

    fetchApi()

    return () => {
      isCancelled = true
    }
  }, [url])

  return [data, isLoading, error]
}
