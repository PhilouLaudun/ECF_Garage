import React, { useState } from "react";
// Exemple si le fichier JSON est dans le même répertoire que votre composant
import menuNav from '../../data/menuNavigation';

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
