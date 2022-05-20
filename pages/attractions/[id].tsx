import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Data = { 
    id: string,
    name: string,
    detail: string,
    coverimage: string
}

const Page = () => {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<Data>({
        id: '', name: '', detail: '', coverimage: ''
  })
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
      if(id){
        setLoading(true)
        fetch(`http://localhost:3000/api/attractions/${id}`)
        .then(res => res.json())
        .then(data => {
            setData(data[0])
            setLoading(false)
        })
      }
  }, [id])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.detail}</p>
      <p>{data.coverimage}</p>
    </div>
  )
}

export default Page