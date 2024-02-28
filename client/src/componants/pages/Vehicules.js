import React, { useEffect, useState } from "react";// chargement des composants react
import { useDispatch, useSelector } from "react-redux";// chargement des fonction de gestion du store 
// import des composants react
import Header from "../autres/Header";
import Footer from "../autres/Footer";
import Presentation from "../autres/Presentation";
import CarteVehicule from "../autres/CarteVehicule";
import FiltreVoiture from "../autres/FiltreVoiture";
import ModaleCarteVehicule from "../autres/ModaleCarteVehicule";
// import des composants mui material
import { Dialog, Pagination } from "@mui/material";
//import des fonctions de gestion du store
import { listVehicule } from "../../features/slice/vehiculeSlice";
// definition de variables internes au composant
const CardsPerPage = 6; // nombre de cartes affichée par le composant navigation de la page
//
//page vehicule (pas de props passées)
const Vehicules = () => {
  // charge les données depuis le store à propos des vehicules et le tableau sera mis à jour à chaque changement du store.
  const authorized = useSelector((state) => state.utilisateur.isAuthentified); // sert pour afficher les options des gens habilités aux fonctions reserveés au personnel du garage
  const vehiculetest = useSelector((state) => state.vehicule.vehicule); // variable contenant les cartes des vehicules
  const dispatch = useDispatch(); // fonction d'envoi des données vers les slices du store
  //const vehiculetest = "";
  const [vehicules, setVehicules] = useState(vehiculetest); // sert pour l'affichage des vehicules, et il est modulé par les filtres
  const [filtres, setFiltres] = useState({
    kilometrage: [0, 200000],
    prix: [0, 50000],
    annee: [2000, 2023],
  }); // definition des limites par défaut des filtres de tri des véhicules, contient les valeurs minimales et maximales déterminées par le glissement du slide, cela sert au tri des véhicules
  const [flagCreation, setFlagCreation] = useState(false); // flag signifiant l'affichage de la modale de création d'un véhicule
  const [hasLoadedData, setHasLoadedData] = useState(false); // flag signifiant le chargement des données provenant de la BD
  //const [message, setMessage] = useState(""); //  message de retour de  la base de données en cas d'erreur ou si elle est vide
  const [currentVehicules, setCurrentVehicules] = useState([]); // index du vehicule choisi pour afficher sa fiche
  const [currentPage, setCurrentPage] = useState(1); // index de la page affichée par la pagination
  const [minMaxValues, setMinMaxValues] = useState({
    minKilometrage: 0,
    maxKilometrage: 0,
    minPrix: 0,
    maxPrix: 0,
    minAnnee: 0,
    maxAnnee: 0,
  }); // sert pour sauvegarder les limites hautes et basses du kilométrage, du prix et de l'année en fonction des vehicules présent dans la base (evite de gérer des limites fixes, c'est plus dynamique et cela évite de se retrouver avec des données hors limites)
  // Style de la modale de création d'un véhicule
  const modalStyle = {
    zIndex: 20,
    position: "absolute",
    margin: "auto",
    display: "flex",
    height: "auto",
    width: "400px",
    "& .MuiPaper-root": { borderRadius: "20px" },
    "& .MuiDialog-paper": {
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.8)",
    },
  }; // format d'affichage de la modale de création des véhicules

  // useEffect déclenché lors du lancement de la page pour récuperer les données de la BD
  useEffect(() => {
    // fonction de chargement des vehicules au départ et ensuite si on rebaisse le flag
    async function fetchData() {
      //  si le flag de chargement des données est baissé alors on charge les données
      if (!hasLoadedData) {
        try {
          const response = await dispatch(listVehicule()); // appel du slice de chargement des données auprés de la BD;
          if (response) {
            // si on obtient une réponse
            if (response.payload.okay === "false") {
              // si le flag okay est faux c'est que la BD est vide
              // Gérer le cas où la table est vide
              //setMessage(response.payload.message); // récupère le message renvoyé par le serveur (base vide)
              setHasLoadedData(true); // Marquer que les données ont été chargées pour autoriser l'affichage
            } else {
              // Les données sont valides
              setHasLoadedData(true); // Marquer que les données ont été chargées
              localStorage.setItem("hasLoadedData", "true"); // garde la valeur du flag de chargement des données dans le stockage local
              //setMessage(""); // effacer le message sinon réapparait
            }
          }
        } catch (error) {
          // en cas d'erreur lors de l'interrogation de la BD
          setHasLoadedData(true); // Marquer que les données ont été chargées
          /*setMessage(
            "Une erreur est survenue lors de la recherche des partenaires."
          )*/;
        }
      }
    }
    fetchData();
  }, [dispatch, hasLoadedData]);

  // Recherche les limites pour les vehicules affichés, déclenché par les mises à jour du drapeau hasLoadedData et du tableau des vehicules chargés à partir de la base de données
  useEffect(() => {
    //recherche effectuée si les données de la base ont été chargées
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
      // Initialise l'état filtres avec les valeurs minimales et maximales du fichier
      setMinMaxValues({
        minKilometrage,
        maxKilometrage,
        minPrix,
        maxPrix,
        minAnnee,
        maxAnnee,
      });

      setVehicules(vehiculetest); // charge le tableau d'affichage des véhicules
    }
  }, [vehiculetest, hasLoadedData]);

  // Fonction de tri des véhicules, appelées par le composant filtreVoiture pour trier les véhicules en fonction des valeurs des slides
  const trierVehicules = (nouveauxFiltres) => {
    setFiltres((prevState) => ({ ...prevState, ...nouveauxFiltres }));
  };

  // Recherche les limites pour les vehicules affichés,
  // Effet de mise à jour des véhicules triés,déclenché par les mises à jour du drapeau hasLoadedData et des filtres appliqués
  useEffect(() => {
    // si les données ont été chargées
    if (hasLoadedData) {
      //filtre les données pour les véhicules concernées et les véhicules trouvés dans le tableau véhicules pour l'affichage
      const vehiculesTri = vehiculetest.filter((vehicule) => {
        return (
          vehicule.Kilometrage >= filtres.kilometrage[0] &&
          vehicule.Kilometrage <= filtres.kilometrage[1] &&
          vehicule.Prix >= filtres.prix[0] &&
          vehicule.Prix <= filtres.prix[1] &&
          vehicule.Annee >= filtres.annee[0] &&
          vehicule.Annee <= filtres.annee[1]
        );
      });
      setVehicules(vehiculesTri); // charge le tableau d'affichage des véhicules
    }
  }, [filtres, hasLoadedData]);
  // gestion de pagination des cartes, déclenché par les mises à jour de la page courante gérée par le composant mui material pagination et la modification du nombre de vehicules à afficher
  useEffect(() => {
    // Pagination, si les données ont été chargées
    if (hasLoadedData) {
      const indexOfLastCard = currentPage * CardsPerPage; // index dans le tableau du dernier véhicule à affichée
      const indexOfFirstCard = indexOfLastCard - CardsPerPage; // index dans le tableau du premier véhicule à affichée modulé du nombre de cartes à aficher par page
      const currentVehicules = vehicules.slice(
        indexOfFirstCard,
        indexOfLastCard
      );
      setCurrentVehicules(currentVehicules); // tableau d'affichage des véhicules filtrés ou non
    }
  }, [currentPage, vehicules]);
  // fonction de modification de la constante currentPage lors du click sur les fleches du composant pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  // fonction pour l'ouverture de la modale de création d'un véhicule aprés click sur le bouton de création
  const creationVehicule = () => {
    setFlagCreation(true); // léve le drapeau de création
  };
  // fonction pour la fermeture de la modale de création d'un véhicule aprés saisie ou annulation d'un véhicule
  const abordCreationVehicule = () => {
    setFlagCreation(false); // baisse le drapeau de création
  };

  return (
    <>
      <main>
        {/* En tete */}
        <Header />
        {/* Corps de la page */}
        <div className="containerbodyservice">
          {/* Affichage image du haut du coprs */}
          <div className="imagepage">
            <img src="./assets/img/reparation tete modif.jpg" alt="Logo" />
          </div>
          {/* Affichage de la présentation de la page*/}
          <div className="presentPage">
            <Presentation className="" page={7} largeur={67} />
          </div>
          {/* Si données chargées et tableau des véhicules non vide */}
          {hasLoadedData && vehicules && (
            <div className="zonevehicule">
              {/*  Zone d'affichage des filtres*/}
              <div className="filtreoccase">
                <FiltreVoiture
                  filtres={filtres}
                  onTriChange={trierVehicules}
                  minMaxValues={minMaxValues}
                />
              </div>
              {/* Zone d'affichage des cartes des vehicules*/}
              <div className="carteoccase-container">
                {/* Affichage du composant de pagination*/}
                <div className="pagination-carteoccase">
                  <Pagination
                    count={Math.ceil(vehicules.length / CardsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                  {/* Affichage du bouton de création des véhicules si personne autorisée*/}
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
                {/* Affichage des cartes des véhicules*/}
                <div className="carteoccase">
                  {currentVehicules.map((vehicule) => (
                    <CarteVehicule
                      key={vehicule.id_vehicule}
                      vehicule={vehicule}
                    />
                  ))}
                  {/* Affichage de la modale de création d'un véhicule*/}
                  {flagCreation && (
                    <Dialog open={true} sx={modalStyle}>
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
        {/* Pied de page */}
        <Footer />
      </main>
    </>
  );
};

export default Vehicules;
