import * as React from 'react';
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { Card , CardActions , CardContent , CardMedia , Container , Button , Typography , Grid } from '@mui/material'

type Data = { 
    id: string,
    name: string,
    detail: string,
    coverimage: string
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/attractions')
  const data: Data[] = await res.json()
  return {
    //use props to pass data to the page
    props: {
      data,
    },
    
  }
}

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(
    <div>
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {data.map(attraction => (
                    <Grid item xs={12} md={4} key={attraction.id}>                   
                        <Card>
                            <CardMedia
                                component="img"
                                alt={attraction.name}
                                height="140"
                                image={attraction.coverimage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {attraction.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap={true}>
                                    {attraction.detail}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={"/attractions/"+attraction.id}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>     
                ))}
            </Grid>
        </Container>
    </div>
  )
  
}

export default Page