import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

const TABLE_CANDIDATES = ["menu_items", "foods"];

const normalizeItem = (item) => {
  const id = item.id ?? item.idMeal ?? item.slug ?? item.name ?? item.title;
  const title = item.title ?? item.name ?? item.dish_name ?? item.strMeal ?? "Untitled item";
  const category = item.category ?? item.strCategory ?? item.type ?? "Featured";
  const description = item.description ?? item.summary ?? item.notes ?? item.strInstructions ?? "";
  const imageUrl = item.image_url ?? item.imageUrl ?? item.image ?? item.photo_url ?? item.strMealThumb ?? "";
  const rawPrice = item.price ?? item.amount ?? item.cost ?? item.price_text ?? "";
  const price = typeof rawPrice === "number" ? rawPrice.toFixed(2) : String(rawPrice || "");

  return {
    ...item,
    id: id ?? `${title}-${category}`,
    title,
    name: title,
    category,
    description,
    imageUrl,
    price,
  };
};

const loadMenuFromTable = async (tableName) => {
  const response = await supabase.from(tableName).select("*").order("created_at", { ascending: false });
  if (response.error) {
    throw response.error;
  }
  return response.data || [];
};

export const fetchFoods = createAsyncThunk("foods/fetchFoods", async () => {
  for (const tableName of TABLE_CANDIDATES) {
    try {
      const records = await loadMenuFromTable(tableName);
      return records.map(normalizeItem);
    } catch (error) {
      const message = String(error?.message || "").toLowerCase();
      if (message.includes("does not exist") || message.includes("42p01")) {
        continue;
      }
      throw error;
    }
  }
  return [];
});

const foodSlice = createSlice({
  name: "foods",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
