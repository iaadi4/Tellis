import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(data.message || "Not authenticated");
    return data.data;
  } catch (err: unknown) {
    if(err instanceof Error)
        return thunkAPI.rejectWithValue(err.message);
    else
        return thunkAPI.rejectWithValue("Failed to verify");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logoutSuccess(state) {
      state.user = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { logoutSuccess, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
