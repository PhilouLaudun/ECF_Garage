import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS
// fonction permettant de verifier a partir du serveur le login des personnes habilitées
export const login = createAsyncThunk("utilisateur/login", async (data) => {
  const res = await service.validLogin(data);
  return res.data;
});

export const listeUtilisateur = createAsyncThunk("utilisateur", async () => {
  const res = await service.listUtilisateur();
  return res.data;
});
export const saveNewAgent = createAsyncThunk(
  "utilisateur/create",
  async ({ data }) => {
    const res = await service.saveNewAgent(data);
    return res.data;
  }
);
export const updateAgent = createAsyncThunk(
  "utilisateur/update",
  async ({ id, data }) => {
    // Afficher les clés et les valeurs du FormData en une seule boucle, a conserver pour memoire
    /*for (var entry of data.entries()) {
      console.log(entry[0] + ": " + entry[1]);
    }*/
    const res = await service.updateAgent(id, data);
    return res.data;
  }
);
// variable définissant l'état initial du slice utilisateur
const initialState = {
  identifiant: null,
  nom: null,
  role: null,
  isAuthentified: false,
  token: null,
  error: null,
  loading: null,
  flagRole: false,
};
// slice contenant les reducers de gestion pour le store du fichier utilisateur
const utilisateurSlice = createSlice({
  // ne pas oublier de le déclarer dans le store pour que fulfilled fonctionne
  name: "utilisateur",
  initialState,
  reducers: {
    resetUtilisateur: (state, { payload }) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log("login.fulfilled");
      const okay = payload.okay.trim().toLowerCase() === "true"; // obliger de faire cela sinon on ne peut pas faire le test car req.body.payload.okay est du texte et boolean ne fontionne pas (ne donne pas true pour true et false pour false)
      if (okay) {
        //  si l'utilisateur est identifié et le mot de passe valide
        state.token = payload.token; // sauve le token dans le store
        state.identifiant = payload.user.Login; // sauve l'identifiant de l'utilisateur identifié
        state.nom = payload.user.Nom; // sa sa sa
        state.role = payload.user.Qualite; // sauve la qualité d'utilisateur identifié
        console.log("state role", state.role, typeof state.role);
        if (state.role === 1) {
          // permet de lever le flag pour les options réservées à l'administrateur
          state.flagRole = true;
        }
        state.isAuthentified = true; // bascule la valeur du flag, avoir si on l'utilise plus tard
      }
    });
  },
});
export const { resetUtilisateur } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
