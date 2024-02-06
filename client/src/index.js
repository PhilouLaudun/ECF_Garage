import React from "react";
import { createRoot } from "react-dom/client"; // permet de créer une racine pour afficher les composants React dans un nœud DOM de navigateur.
import { BrowserRouter } from "react-router-dom"; // permet de gérer les routes vers les page
import App from "./App"; // import du composant App qui sert à la navigation dans les pages
import "./styles/index.scss"; // import des styles des pages et des composants

// gestion du store
import { Provider } from "react-redux"; // import de Provider pour rendre Redux store disponible à tous les composants imbriqués qui doivent accéder au magasin Redux.

import { PersistGate } from "redux-persist/integration/react"; // retarde le rendu de l'interface utilisateur de votre application jusqu'à ce que votre état persistant ait été récupéré et enregistré dans Redux.
import { store, persistor } from "./features/store"; // import du store et de son persistant

/*Mise en place du système de navigation, du store et du persist-store pour conserver le store lors de l'actualisation des pages. Utilisation de redux-persist*/
const container = document.getElementById("root"); // récupére l'adresse de root dans la page HTML
// Utilisez createRoot pour le rendu de l'application
const root = createRoot(container); // crée un élémnt racine pour React
root.render(
  <Provider store={store}>
    {/* rend Redux store disponible à tous les composants imbriqués qui doivent accéder au magasin Redux.*/}
    {/* retarde le rendu de l'interface utilisateur de votre application jusqu'à ce que votre état persistant ait été récupéré et enregistré dans Redux..*/}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
