import { Button, MenuItem, Select, Slider, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, searchByName, setCategory, setCompany, setRange } from "../Slices/ProductSlice";

const Filter = () => {
  const {name,price,color,company,category} = useSelector(state=>state.products.filters);
  const {companies,categories} = useSelector(state=>state.products);
    const dispatch = useDispatch();

    const handleName =(text)=>{
        dispatch(searchByName(text));
    }
  return (
    <Stack spacing={2}>
      <div>
        <h3>Search:</h3>
        <TextField fullWidth value={name} onChange={(e)=>handleName(e.target.value)}/>
      </div>
      <div>
        <h3>Price: </h3>
        <Slider  value={price} min={0} max={3500} valueLabelDisplay="auto" step={500} onChange={(e)=>dispatch(setRange(e.target.value))}/>
      </div>
      <div>
        <h3>Color: </h3>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={color}
          label=""
          fullWidth
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
          <MenuItem value={"yellow"}>yellow</MenuItem>
        </Select>
      </div>
      <div>
        <h3>Company: </h3>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={company}
          label=""
          fullWidth
          onChange={e=>dispatch(setCompany(e.target.value))}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {
            companies.map((v,index)=> <MenuItem key={index} value={v}>{v}</MenuItem>)
          }
          
        </Select>
      </div>
      <div>
      <h3>Categories: </h3>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label=""
          fullWidth
          onChange={e=>dispatch(setCategory(e.target.value))}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {
            categories.map((v,index) => <MenuItem key={index}  value={v}>{v}</MenuItem>)
          }
         
        </Select>
      </div>
      <Button onClick={()=>dispatch(clearFilter())} variant="outlined">clear filters</Button>
    </Stack>
  );
};

export default Filter;