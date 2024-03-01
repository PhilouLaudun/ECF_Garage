import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer la liste des équipements
export const fetchEquip = createAsyncThunk("equipement/liste ", async () => {
  const res = await service.fetchEquip();
  return res.data;
});
// fonction permettant de créer un équipement
export const createEquip = createAsyncThunk(
  "equipement/create",
  async (data) => {
    const res = await service.createEquip(data);
    return res.data;
  }
);

// variable définissant l'état initial du slice image
const initialState = {
  equipement: null,
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion pour le store
const equipementSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "equipement",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquip.fulfilled, (state, { payload }) => {
        const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et la fonction boolean ne fontionne pas (ne donne pas true pour true et false pour false)
        if (okay) {
          //  si la base n'est pas vide alors on charge la liste des équipements
          state.equipement = payload.data; // charge le store avec la liste des équipements
        } else {
          state.equipement = []; // ne charge rien dans le store
        }
      })
      .addCase(createEquip.fulfilled, (state, { payload }) => {
        state.equipement.push(payload);
      });
  },
});
export default equipementSlice.reducer;
