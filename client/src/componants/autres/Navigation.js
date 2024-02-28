import React, { useState } from "react";// chargement des composants react
// import des données
import menuNav from '../../data/menuNavigation';
//
//composant Navigation (pas de props passées)
const Navigation = () => {
  const [menus, setMenus] = useState(menuNav);
  return (
    <main className="containerNavigation">
      {menus.map((menu) => (
        <div key={menu.id}>
          <a href={menu.adresse_page} >
            {menu.designation}
          </a>
        </div>
      ))}
    </main>
  );
};

export default Navigation;
