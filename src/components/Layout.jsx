import { Container, Grid } from '@mui/material'
import React from 'react'
import Filter from './Filter';
import Product from './Product';

const Layout = () => {
  return (
    <Container>
        <Grid sx={{marginTop: 10}} columnSpacing={3} container>
            <Grid item xs={12} md={3}>
                <Filter/>
            </Grid>
            <Grid item xs={12} md={9}>
            <Product/>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Layout;