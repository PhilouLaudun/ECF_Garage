import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer la liste des options
export const fetchOpt = createAsyncThunk("option/liste ", async () => {
  const res = await service.fetchOpt();
  return res.data;
});
// fonction permettant de créer une option
export const createOpt = createAsyncThunk(
  "option/create",
  async (data) => {
    const res = await service.createOpt(data);
    return res.data;
  }
);

// variable définissant l'état initial du slice
const initialState = {
  option: null,
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion pour le store
const optionSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "option",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpt.fulfilled, (state, { payload }) => {
        const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et la fonction boolean ne fontionne pas (ne donne pas true pour true et false pour false)
       
        if (okay) {
          //  si la base n'est pas vide alors on charge la liste des options
          state.option = payload.data; // charge le store avec la liste des options
        } else {
          state.option = []; // ne charge rien dans le store
        }
      })
      .addCase(createOpt.fulfilled, (state, { payload }) => {
        state.option.push(payload);
      });
  },
});
export default optionSlice.reducer;
