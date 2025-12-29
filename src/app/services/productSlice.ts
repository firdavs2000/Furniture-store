import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  page: number;
}

const initialState: ProductsState = {
  items: [],
  page: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setProducts, setPage } = productsSlice.actions;
export default productsSlice.reducer;
