import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS
// fonction permettant de verifier a partir du serveur le login des personnes habilitées


export const listeAvis = createAsyncThunk("avis", async () => {
 const res = await service.listeAvis();
return res.data;
});
export const saveAvis = createAsyncThunk("avis/create", async ({ message }) => {
  const res = await service.saveAvis(message);
  return res.data;
});
export const updateAvis = createAsyncThunk(
  "avis/update",
  async ({ id, messageaenvoyer }) => {
    // Afficher les clés et les valeurs du FormData en une seule boucle, a conserver pour memoire
    /*for (var entry of data.entries()) {
      console.log(entry[0] + ": " + entry[1]);
    }*/
    const res = await service.updateAvis(id, messageaenvoyer);
    return res.data;
  }
);
export const deleteAvis = createAsyncThunk(
  "avis/delete",
  async ({ id_message }) => {
    const res = await service.deleteAvis(id_message);
    return res.data;
  }
);
// variable définissant l'état initial du slice utilisateur
const initialState = {
  message: null,
};
// slice contenant les reducers de gestion pour le store du fichier utilisateur
const blogSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "blog",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(listeAvis.fulfilled, (state, { payload }) => {
      const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et boolean ne fontionne pas (ne donne pas true pour true et false pour false) 
      if (okay) {
          //  si la base n'est pas vide alors on charge la liste des véhicules
          state.message = payload.data; // charge le store avec la liste des véhicules
        } else {
          state.message = []; // ne charge rien dans le store
        }
    });
    
  },
});
export default blogSlice.reducer;
