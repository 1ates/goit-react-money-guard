import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStatistics } from "../../services/statisticsApi.js";

export const fetchStatistics = createAsyncThunk("statistics/fetchStatistics", async ({ month, year }, thunkAPI) => {
  try {
    return await getStatistics(month, year);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.reponse?.data?.message ?? error.message);
  }
});
