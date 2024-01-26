import { Routes, Route } from "react-router-dom"; // import de la balise route pour naviguer dans les pages
import Home from "./componants/pages/Home";
function App() {
  console.log("app");
  /*<Route path="/partenaire" exact element={<Partenaire />} />
    <Route path="/structures" exact element={<Structurespage />} />
    <Route path="/gestionpresta" exact element={<Gestionpresta />} />*/
  return (
    <div>
      <Routes>
    {/* Définition des routes des pages */}
    <Route path="/" exact element={<Home />} />

  </Routes></div>
);
  
}

export default App;
