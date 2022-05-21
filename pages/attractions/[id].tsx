import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Card , CardActions , CardContent , CardMedia , Container , Button , Typography , Grid } from '@mui/material'

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
        <Head>
            <title>attraction</title>
        </Head>
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                    <Grid item xs={12} key={data.id}>                   
                        <Card>
                            <CardMedia
                                component="img"
                                alt={data.name}
                                height="500"
                                image={data.coverimage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {data.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap={true}>
                                    {data.detail}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={"/attractions/"+data.id}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>     
            </Grid>
        </Container>
    </div>
  )
}

export default Page