import React from "react";
import { createRoot } from "react-dom/client"; // permet de créer une racine pour afficher les composants React dans un nœud DOM de navigateur.
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import App from "./App";

/*Mise en place du système de navigation, du store et du persist-store pour conserver le store lors de l'actualisation des pages. Utilisation de redux-persist*/
const container = document.getElementById("root"); // récupére l'adresse de root dans la page HTML
// Utilisez createRoot pour le rendu de l'application
const root = createRoot(container); // crée un élémnt racine pour React
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
