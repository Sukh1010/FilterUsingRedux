import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../Slices/ProductSlice';

const Product = () => {
    const dispatch = useDispatch();
    const {filteredProducts: products, loading }= useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(fetchProducts());
    },[]);
  return (
    <Grid  container spacing={2}>
    {
    loading ? <Grid item xs={12}><CircularProgress /></Grid>: products?.map(product=>{
      return<Grid key={product.id} item xs={6} md={4}>
          <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
         $ {product.price}
        </Typography>
        <Typography variant="h6" color="text.secondary">
         {product.company}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add Cart</Button>
        <Button size="small">Buy Now</Button>
      </CardActions>
    </Card>
      </Grid>
  })
        
    }
    </Grid>
  )
}

export default Product