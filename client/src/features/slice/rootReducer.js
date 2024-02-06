// crétion des slice uilisés par le store
import { combineReducers } from "redux";
import utilisateurReducer from "./loginSlice";


// création de la fonction de combinaison des slices
const rootReducer = combineReducers({
  utilisateur: utilisateurReducer,
});

export default rootReducer;