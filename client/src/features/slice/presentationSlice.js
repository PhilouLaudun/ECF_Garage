import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Presentation from "../../services/service";

// fonction permettant de récupérer l'ensembles des textes des compsant de présentation
export const listPresentations = createAsyncThunk("presentation", async () => {
    const res = await Presentation.listPresentations();
return res.data
})
// fonction permettant de mettre à jour une présentation
export const updatePresentations = createAsyncThunk(
  "presentation/update",
  async ({ id,message }) => {
    const res = await Presentation.updatePresentations(id, message);
    return res.data;
  }
);

const initialState = {
    presentation: null,
}

const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listPresentations.fulfilled, (state, { payload }) => {
          const okay = payload.okay.trim().toLowerCase() === "true";
          if (okay) {
            state.presentation = payload.data;
          } else {
            state.presentation = [];
          }
        });
    }
});

export default presentationSlice.reducer
