import { blogData } from "@/components/blogs/blogsPage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (page, { rejectWithValue }) => {
    try {
      //   const response = await fetch(`/api/blogs?page=${page}`);
      //   const data = await response.json();
      const startIndex = (page - 1) * 6;
      const endIndex = page * 6;
      const data = blogData.slice(startIndex, endIndex);
      console.log("redux*****" , page,data)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data); // بازگرداندن داده‌ها بعد از 4 ثانیه
        }, 4000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blogs: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    resetBlogs: (state) => {
      state.blogs = [];
      state.page = 1;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (action.payload?.length === 0) {
          state.hasMore = false;
        } else {
          state.blogs = [...state.blogs, ...action.payload];
        }
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { nextPage , resetBlogs } = blogSlice.actions;
export default blogSlice.reducer;
