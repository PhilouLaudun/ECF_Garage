import React from 'react'
import textePresentation from "../../data/datapresentation"
const Presentation = ({ page ,largeur }) => {
  var presentation = textePresentation[page - 1];
  var titre = presentation.titre;
  var message1 = presentation.message1;
  var message2 = presentation.message2;
  var message3 = presentation.message3;

  // Ajoutez le style avec la largeur en pourcentage
  const largeurPresentation = {
    width: `${largeur}%`,
  };
  return (
    <main className="mainPresentation" style={largeurPresentation}>
      <div className="titrepresentation">{titre}</div>
      <div className="messagepresentation">{message1}</div>
      <div className="messagepresentation">
        {message2 && <div>{message2}</div>}
      </div>
      <div className="messagepresentation">
        {message3 && <div>{message3}</div>}
      </div>
    </main>
  );
};

export default Presentation