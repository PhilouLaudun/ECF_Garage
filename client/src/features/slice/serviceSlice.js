import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../../services/service";

// fonction permettant de récupérer la liste des services
export const listServices = createAsyncThunk("service", async () => {
    const res = await Service.listServices();
return res.data
})
// fonction permettant de mettre à jour un service
export const updateServices = createAsyncThunk(
  "service/update",
  async ({  id,message }) => {
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
