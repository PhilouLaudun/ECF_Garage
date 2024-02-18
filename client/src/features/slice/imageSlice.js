import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer auprès du serveur les images liées à un vehicule
export const fetchImageById = createAsyncThunk("image/byId", async (data) => {
  const res = await service.fetchImageById(data);
  return res.data;
});

//fonction permettant d'ajouter un partenaire à la base de données
export const ajoutImage = createAsyncThunk("image/ajout", async ({ data }) => {
  console.log("ajoutImage Slice", data);
  const res = await service.ajoutImage(data);
  return res.data;
});

// variable définissant l'état initial du slice image
const initialState = {
  images: [],
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion pour le store du fichier image
const imageSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "image",
  initialState,
  reducers: {
    resetUtilisateur: (state, { payload }) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImageById.fulfilled, (state, { payload }) => {
state.images = payload.data;
    });
  },
});;
export default imageSlice.reducer;
