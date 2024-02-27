import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../../services/service";


export const listServices = createAsyncThunk("service", async () => {
    const res = await Service.listServices();
return res.data
})
export const updateServices = createAsyncThunk(
  "service/update",
  async ({  id,message }) => {
    console.log("slice service update", id, message);
    const res = await Service.updateServices(id, message);
    return res.data;
  }
);

const initialState = {
    service: null,
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listServices.fulfilled, (state, { payload }) => {
          const okay = payload.okay.trim().toLowerCase() === "true";
          if (okay) {
            state.service = payload.data;
          } else {
            state.service = [];
          }
        });
    }
});

export default serviceSlice.reducer;
