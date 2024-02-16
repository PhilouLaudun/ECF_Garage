
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS
// fonction permettant de charger a partir du serveur l'ensemble des partenaires
export const listVehicule = createAsyncThunk("vehicule/list", async () => {
  const res = await service.getAllVehicule();
  return res.data;
});
//fonction permettant d'ajouter un partenaire à la base de données
export const createVehicule = createAsyncThunk(
    "vehicule/create",
    async ({ data }) => {
        console.log("createVehicule Slice")
      const res = await service.createVehicule(data);
      return res.data;
  });
    

// variable définissant l'état initial du slice partenaire
const initialState = {
  vehicule: null,
  vehiculeEnCours: null, // Ajout de la nouvelle variable vehiculeEnCours
  updateDataStatusVehicule: "idle", // flag levé aprés un succés d'accés à la base de donné (fullfilled) sinon idle. Rem : on ne gere pas les erreurs actuellement
};    

const vehiculeSlice = createSlice({
  name: "vehicule",
  initialState,
  reducers: {
    setVehiculeEnCours: (state, action) => {
      state.vehiculeEnCours = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicule.fulfilled, (state, { payload }) => {
        state.vehicule.push(payload);
      })
      .addCase(listVehicule.fulfilled, (state, { payload }) => {
        const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et la fonction boolean ne fontionne pas (ne donne pas true pour true et false pour false)
        if (okay) {
          //  si la base n'est pas vide alors on charge la liste des véhicules
          state.vehicule = payload.data; // charge le store avec la liste des véhicules
        } else {
          state.vehicule = []; // ne charge rien dans le store
        }
      });
  },
});
export const { setVehiculeEnCours } = vehiculeSlice.actions;
export default vehiculeSlice.reducer;