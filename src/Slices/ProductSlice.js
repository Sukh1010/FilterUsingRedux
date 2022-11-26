import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  filteredProducts: [],
  loading: true,
  error: false,
  filters: {
    name: "",
    price: 3500,
    color: "all",
    company: "all",
    category: "all",
  },
  colors: [],
  categories: [],
  companies: [],
};

const check = (item, filter) => {
  let { name, price, color, company, category } = filter;
  let checkName = name === "" ? true : item.name.includes(name) ? true : false;
  let checkPrice = price >= item.price;
  let checkColor = color === "all" ? true : color === item.color ? true : false;
  let checkCompany =
    company === "all" ? true : company === item.company ? true : false;
  let checkCategory =
    category === "all" ? true : category === item.category ? true : false;

  return checkName && checkPrice && checkColor && checkCompany && checkCategory;
};

const filter_Items = (items, filter) => {
  let result = items.filter((item) => {
    return check(item, filter);
  });
  return result;
};

const company = (items) => {
  let arr = [];
  items.map((item) => {
    let check = arr.includes(item.company);
    !check && arr.push(item.company);
  });

  return arr;
};
const category = (items) => {
  let arr = [];
  items.map((item) => {
    let check = arr.includes(item.category);
    !check && arr.push(item.category);
  });

  return arr;
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return axios("https://course-api.com/react-store-products")
    .then((res) => res.data)
    .catch((res) => res.err);
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchByName: (state, action) => {
      let name = action.payload;
      state.filters.name = name;
      state.filteredProducts = filter_Items(state.products, state.filters);
    },
    setRange: (state, action) => {
      state.filters.price = action.payload;
      state.filteredProducts = filter_Items(state.products, state.filters);
    },
    setCompany: (state, action) => {
      state.filters.company = action.payload;
      state.filteredProducts = filter_Items(state.products, state.filters);
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
      state.filteredProducts = filter_Items(state.products, state.filters);
    },
    clearFilter: (state) => {
      state.filters.name = "";
      state.filters.price = 3500;
      state.filters.color = "all";
      state.filters.company = "all";
      state.filters.category = "all";
      state.filteredProducts = filter_Items(state.products, state.filters);
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      let products = action.payload.map((item) => {
        item.price = Math.ceil(item.price / 100);
        return item;
      });
      state.loading = false;
      state.products = products;
      state.filteredProducts = products;
      state.companies = company(state.products);
      state.categories = category(state.products);
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchByName, setRange, setCategory, setCompany, clearFilter } =
  productSlice.actions;
export default productSlice.reducer;
