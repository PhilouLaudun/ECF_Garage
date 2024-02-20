import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../../services/service";


export const listHoraires = createAsyncThunk("horaire", async () => {
    console.log("slice horaires");
    const res = await Service.listeHoraires();
return res.data
})
export const updateHoraires = createAsyncThunk(
  "horaire/update",
  async ({ horairesModif }) => {
    console.log("slice horaires update", horairesModif);
    const res = await Service.updateHoraires(horairesModif);
    return res.data;
  }
);

const initialState = {
    horaire: null,
}

const horaireSlice = createSlice({
    name: "horaire",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listHoraires.fulfilled, (state, { payload }) => {
            const okay = payload.okay.trim().toLowerCase() === "true";
            if (okay) {
                state.horaire = payload.data;
            } else {
                state.horaire = []
            }
            
            
        });
    }
});

export default horaireSlice.reducer
