import React from "react"; // Importez React
import { Routes, Route } from "react-router-dom"; // import de la balise route pour naviguer dans les pages
// import des composants pour la définitions des routes
import Home from "./componants/pages/Home";
import Entretien from "./componants/pages/Entretien";
import Carrosserie from "./componants/pages/Carrosserie";
import Occasion from "./componants/pages/Occasion";
import Autres from "./componants/pages/Autres";
import Contact from "./componants/pages/Contact";
import Vehicules from "./componants/pages/Vehicules";
import FicheVehicule from "./componants/pages/FicheVehicule";
// gestion des routes
function App() {
  return (
    <div>
      <Routes>
        {/* Définition des routes des pages */}
        <Route path="/" exact element={<Home />} />
        <Route path="/entretien" exact element={<Entretien />} />
        <Route path="/carrosserie" exact element={<Carrosserie />} />
        <Route path="/occasion" exact element={<Occasion />} />
        <Route path="/autres" exact element={<Autres />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/vehicule" exact element={<Vehicules />} />
        <Route path="/fichevehicule" exact element={<FicheVehicule />} />
      </Routes>
    </div>
  );
}

export default App;
