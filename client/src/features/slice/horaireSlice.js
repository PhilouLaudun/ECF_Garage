import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../../services/service";

// fonction permettant de récuperer les horaires
export const listHoraires = createAsyncThunk("horaire", async () => {
    const res = await Service.listeHoraires();
return res.data
})
// fonction permettant de mettre à jour les horaires
export const updateHoraires = createAsyncThunk(
  "horaire/update",
  async ({ horairesModif }) => {
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
