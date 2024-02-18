import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer auprès du serveur les images liées à un vehicule
export const fetchOpt = createAsyncThunk("option/liste ", async () => {
  const res = await service.fetchOpt();
  return res.data;
});
export const createOpt = createAsyncThunk(
  "option/create",
  async (data) => {
    console.log("optionSlicer", data)
    const res = await service.createOpt(data);
    return res.data;
  }
);

// variable définissant l'état initial du slice image
const initialState = {
  option: null,
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion pour le store du fichier image
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
          //  si la base n'est pas vide alors on charge la liste des véhicules
          state.option = payload.data; // charge le store avec la liste des véhicules
        } else {
          state.option = []; // ne charge rien dans le store
        }
      })
      .addCase(createOpt.fulfilled, (state, { payload }) => {
        console.log("payload createOpt",payload)
        state.option.push(payload);
      });
  },
});
export default optionSlice.reducer;
