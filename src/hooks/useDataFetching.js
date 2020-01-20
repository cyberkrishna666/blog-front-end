import { useState, useEffect } from "react"

function useDataFetching(fetchFunc, dataSource) {
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState({})
  const [ error, setError ] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFunc(dataSource)
        if (data) {
          setData(data)
          setTimeout( () => { setLoading(false) }, 300)
        }
      } catch (exception) {
        console.log(`ERROR MESSAGE: ${exception}`);
        
        setLoading(false)
        
      }
      setTimeout( () => { setLoading(false) }, 300)
    }

    fetchData()
  }, [fetchFunc, dataSource])

  return [
    error,
    loading,
    data
  ]
}

export default useDataFetching