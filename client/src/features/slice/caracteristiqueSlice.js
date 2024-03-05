import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

// fonction permettant de récuperer les caractéristiques d'un vehicule
export const fetchCaractById = createAsyncThunk(
  "caracteristique/byId",
  async (data) => {
    const res = await service.fetchCaractById(data);
    return res.data;
  }
);
// création d'une carctéristique pour un vehicule
export const createCaract = createAsyncThunk(
  "caracteristique/create",
  async ({ data }) => {
    const res = await service.createCaract(data);
    return res.data;
  }
);
// mise à jour des caracteristiques d'un vehicule
export const updateCaract = createAsyncThunk(
  "caracteristique/update",
  async ({ id, data }) => {
    const res = await service.upadteCaract(id, data);
    return res.data;
  }
);

// variable définissant l'état initial du slice image
const initialState = {
  caracteristique: null,
  loading: false,
  error: null,
};
// slice contenant les reducers de gestion
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
          //  si la base n'est pas vide alors on charge la liste des caractéristiques -->
          state.caracteristique = payload.data; // charge le store avec la liste des caractéristiques
        } else {
          state.caracteristique = payload.data = []; // ne charge rien dans le store
        }
      })
      .addCase(createCaract.fulfilled, (state, { payload }) => {
        state.caracteristique = payload.data;
      })
      .addCase(updateCaract.fulfilled, (state, { payload }) => {
       const { flagmodifdonnee, ...data } = payload; // on supprime le flag flagmodifdonnee du payload avant de stocker les données dans le store
        // Stocker les données dans le store
      
      // state.caracteristique = [data]; on ne récupére pas les données revenant du controller ,on réactalise les données en interrogeant la base

      });
      ;
    
  },
});
export const { resetCaracteristique } = caracteristiqueSlice.actions;
export default caracteristiqueSlice.reducer;
