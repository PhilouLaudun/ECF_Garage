// création du store qui ici sera persistant pour permettre la suvegarde du store lors de l'actualisation des pages
import { configureStore } from "@reduxjs/toolkit"; // import de la fonction de déclaration d'un store et de la focntion permettent de restreindre certains middleware qui créent des erreurs sans plantage avec redux-persist
import { persistStore, persistReducer } from "redux-persist" // import des fonctions de la mise en persistance du store
import storage from "redux-persist/lib/storage" // import de l'adresse du store persistant
import rootReducer from "./slice/rootReducer"; // import des slices de l'application
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";  
const persistConfig = { key: 'root', storage, }; // store persistant
const persistedReducer = persistReducer(persistConfig, rootReducer); //reducer persistant 

// création du store et appel des reducers associés
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});
const persistor = persistStore(store); // store utilisé

// Purge the store before exporting it
export { store, persistor };
