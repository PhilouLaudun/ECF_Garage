import React, { useEffect, useState } from "react";
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import dataPageService from "../../data/dataPageService";
import Presentation from "../autres/Presentation";
import dataCarteVehicule from "../../data/dataCarteVehicule";
import CarteVehicule from "../autres/CarteVehicule";
import FiltreVoiture from "../autres/FiltreVoiture";
import { Dialog, Pagination } from "@mui/material";
import ModaleCarteVehicule from "../autres/ModaleCarteVehicule";
import { listVehicule } from "../../features/slice/vehiculeSlice";
import { useDispatch, useSelector } from "react-redux";
const CardsPerPage = 6; // nombre de cartes par page
const Vehicules = () => {
  // charge les données depuis le store à propos des vehicules et le tableau sera mis à jour à chaque changement du store.
  const authorized = useSelector((state) => state.utilisateur.isAuthentified);
  const vehiculetest = useSelector((state) => state.vehicule.vehicule); // variable contenant les cartes des vehicules
  const dispatch = useDispatch();
  //const vehiculetest = "";
  const [vehicules, setVehicules] = useState(vehiculetest);
  const [filtres, setFiltres] = useState({
    kilometrage: [0, 200000],
    prix: [0, 50000],
    annee: [2000, 2023],
  });
  const [flagCreation, setFlagCreation] = useState(false);
  /*const [hasLoadedData, setHasLoadedData] = useState(
    localStorage.getItem("hasLoadedData") === "true" ? true : false
  ); // Charger l'état depuis le localStorage*/
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [message, setMessage] = useState(""); //  message de retour de  la base de données en cas d'erreur ou si elle est vide
  const [currentVehicules, setCurrentVehicules] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    minKilometrage: 0,
    maxKilometrage: 0,
    minPrix: 0,
    maxPrix: 0,
    minAnnee: 0,
    maxAnnee: 0,
  });
  const modalStyleParten = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "400px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": { borderRadius: "20px" },
  };
  useEffect(() => {
    async function fetchData() {
      // fonction de chargement des vehicules au départ
      if (!hasLoadedData) {
        //  si le tableau partenaire est vide et si les données n'ont pas été chargé

        try {
          //alors on charge les données
          const response = await dispatch(listVehicule()); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedData(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides
              setHasLoadedData(true); // Marquer que les données ont été chargées
              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedData(true); // Marquer que les données ont été chargées
          setMessage(
            "Une erreur est survenue lors de la recherche des partenaires."
          );
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedData]);
  // Rechercher les limites dans dataCarteVehicule
  useEffect(() => {
    if (hasLoadedData) {
      const minKilometrage = Math.min(
        ...vehiculetest.map((vehicule) => vehicule.Kilometrage)
      );
      const maxKilometrage = Math.max(
        ...vehiculetest.map((vehicule) => vehicule.Kilometrage)
      );
      const minPrix = Math.min(
        ...vehiculetest.map((vehicule) => vehicule.Prix)
      );
      const maxPrix = Math.max(
        ...vehiculetest.map((vehicule) => vehicule.Prix)
      );
      const minAnnee = Math.min(
        ...vehiculetest.map((vehicule) => vehicule.Annee)
      );
      const maxAnnee = Math.max(
        ...vehiculetest.map((vehicule) => vehicule.Annee)
      );
      // Initialiser l'état filtres avec les valeurs minimales et maximales du fichier
      setMinMaxValues({
        minKilometrage,
        maxKilometrage,
        minPrix,
        maxPrix,
        minAnnee,
        maxAnnee,
      });

      setVehicules(vehiculetest);
    }
  }, [vehiculetest, hasLoadedData]);

  // Fonction de tri des véhicules
  const trierVehicules = (nouveauxFiltres) => {
    setFiltres((prevState) => ({ ...prevState, ...nouveauxFiltres }));
  };

  // Effet de mise à jour des véhicules triés
  useEffect(() => {
    if (hasLoadedData) {
      const vehiculesTri = vehiculetest.filter((vehicule) => {
        // Appliquez votre logique de tri ici
        return (
          vehicule.Kilometrage >= filtres.kilometrage[0] &&
          vehicule.Kilometrage <= filtres.kilometrage[1] &&
          vehicule.Prix >= filtres.prix[0] &&
          vehicule.Prix <= filtres.prix[1] &&
          vehicule.Annee >= filtres.annee[0] &&
          vehicule.Annee <= filtres.annee[1]
        );
      });
      setVehicules(vehiculesTri);
    }
  }, [filtres, hasLoadedData]);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Pagination
    if (hasLoadedData) {
      const indexOfLastCard = currentPage * CardsPerPage;
      const indexOfFirstCard = indexOfLastCard - CardsPerPage;
      const currentVehicules = vehicules.slice(
        indexOfFirstCard,
        indexOfLastCard
      );
      setCurrentVehicules(currentVehicules);
    }
  }, [currentPage, vehicules]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const creationVehicule = () => {
    setFlagCreation(true);
  };
  const abordCreationVehicule = () => {
    setFlagCreation(false);
  };

  return (
    <>
      <main>
        <Header />
        <div className="containerbodyservice">
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          <div className="presentPage">
            <Presentation className="" page={7} largeur={45} />
          </div>
          {hasLoadedData && vehicules && (
            <div className="zonevehicule">
              <div className="filtreoccase">
                <FiltreVoiture
                  filtres={filtres}
                  onTriChange={trierVehicules}
                  minMaxValues={minMaxValues}
                />
              </div>
              <div className="carteoccase-container">
                <div className="pagination-carteoccase">
                  <Pagination
                    count={Math.ceil(vehicules.length / CardsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                  {authorized && (
                    <button
                      key="unique_key"
                      className="boutoncreation"
                      onClick={creationVehicule}
                    >
                      Créer un véhicule
                    </button>
                  )}
                </div>
                <div className="carteoccase">
                  {currentVehicules.map((vehicule) => (
                    <CarteVehicule
                      key={vehicule.id_vehicule}
                      vehicule={vehicule}
                    />
                  ))}
                  {flagCreation && (
                    <Dialog open={true} sx={modalStyleParten}>
                      <ModaleCarteVehicule
                        vehicule={currentVehicules[0]}
                        onClose={abordCreationVehicule}
                        newvehicule={true}
                      />
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Vehicules;
