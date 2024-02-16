// crétion des slice uilisés par le store
import { combineReducers } from "redux";
import utilisateurReducer from "./loginSlice";
import vehiculeRecucer from "./vehiculeSlice"
import imageReducer from "./imageSlice"
import caracteristiqueReducer from "./caracteristiqueSlice"
import equipementReducer from "./equipementSlice"

// création de la fonction de combinaison des slices
const rootReducer = combineReducers({
  utilisateur: utilisateurReducer,
  vehicule: vehiculeRecucer,
  image: imageReducer,
  caracteristique: caracteristiqueReducer,
  equipement: equipementReducer,
});

export default rootReducer;