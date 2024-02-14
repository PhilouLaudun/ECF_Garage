import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer auprès du serveur les images liées à un vehicule
export const fetchCaractById = createAsyncThunk("caracteristique/byId", async (data) => {
  const res = await service.fetchCaractById(data);
  return res.data;
});
export const createCaract = createAsyncThunk("caracteristique/create", async ({data}) => {
  const res = await service.createCaract(data);
  return res.data;
});

// variable définissant l'état initial du slice image
const initialState = {
  caracteristique: null,
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion pour le store du fichier image
const caracteristiqueSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "caracteristique",
  initialState,
  reducers: {
    resetCaracteristique: (state, { payload }) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaractById.fulfilled, (state, { payload }) => {
const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et la fonction boolean ne fontionne pas (ne donne pas true pour true et false pour false)
if (okay) {
  //  si la base n'est pas vide alors on charge la liste des véhicules
  state.caracteristique = payload.data; // charge le store avec la liste des véhicules
} else {
  state.caracteristique = payload.data = []; // ne charge rien dans le store
}


      })
      .addCase(createCaract.fulfilled, (state, { payload }) => {
        state.caracteristique = payload.data;




      });
  },
});
export const { resetCaracteristique } = caracteristiqueSlice.actions;
export default caracteristiqueSlice.reducer;
