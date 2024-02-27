import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listHoraires,
  updateHoraires,
} from "../../features/slice/horaireSlice";

const Horaires = () => {
  const role = useSelector((state) => state.utilisateur.role);
  const horaires = useSelector((state) => state.horaire.horaire);
  const [hasLoadedDataHoraire, setHasLoadedDataHoraire] = useState(false);
  const dispatch = useDispatch();
  const [horairesModif, setHorairesModif] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!hasLoadedDataHoraire) {
        try {
          const response = dispatch(listHoraires()); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedDataHoraire(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides

              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              // setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedDataHoraire(true); // Marquer que les données ont été chargées
          /*setMessage(
          "Une erreur est survenue lors de la recherche des partenaires."
        );*/
        }
      }
    }
    fetchData();
  }, [dispatch, setHasLoadedDataHoraire, horaires]);
  // Mettre à jour horairestest avec les horaires initiaux du store Redux
  useEffect(() => {
    if (hasLoadedDataHoraire) {
      setHorairesModif(horaires);
    }
  }, [horaires]);
  const handleChange = (idHoraire, newValue) => {
    if (role === 1) {
      // Mettre à jour l'horaire correspondant dans horairestest
      const updatedHoraires = horairesModif.map((horaire) =>
        horaire.id_horaire === idHoraire
          ? { ...horaire, Horaires: newValue }
          : horaire
      );
      setHorairesModif(updatedHoraires);
    }
  };

  const saveData = () => {
    // Code to save data to a file (data.js)
    // You may use a server-side logic or browser APIs like localStorage or IndexedDB for client-side storage
    // For simplicity, I'll just console log the data here
    dispatch(updateHoraires({ horairesModif: horairesModif }));
  };

  return (
    <div className="horaire">
      <h2>HORAIRES D'OUVERTURE</h2>
      {hasLoadedDataHoraire && (
        <div className="horaires-list">
          {horairesModif.map(({ id_horaire, Jour, Horaires }) => (
            <div key={id_horaire} className="horaire-item">
              <label>{`${
                Jour.charAt(0).toUpperCase() + Jour.slice(1)
              } : `}</label>
              <input
                type="text"
                placeholder={Horaires}
                value={Horaires}
                onChange={(e) => handleChange(id_horaire, e.target.value)}
                disabled={role !== 1}
              />
            </div>
          ))}
        </div>
      )}

      {role === 1 && (
        <button className="boutonoccase" onClick={saveData}>
          Save
        </button>
      )}
    </div>
  );
};

export default Horaires;
