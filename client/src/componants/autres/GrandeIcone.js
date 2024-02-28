import React from 'react'; // chargement des composants react
// import des composant mui material
import { styled } from "@mui/system";
//import des iconeds mui material
import { IconButton } from "@mui/material";
// définition du style du cercle autour des icones
    const StyledCircle = styled("div")({
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      border: "2px solid #6C5DBB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: "#BAEE0C",
        border: "2px solid #FFFFFF",
        "& .MuiSvgIcon-root": {
          color: "#FFFFFF !important", // Couleur de l'icône au survol
        },
      },
      // adaptation responsive 
      "@media (max-width: 420px)": {
        width: "80px",
        height: "80px",
      },
    });
//
// composant GrandeIcone (props passées : nom mui material de l'icone à afficher)
const GrandeIcone = ({ materialIcon: MaterialIcon }) => {
  return (
    <div>
      <StyledCircle>
        {/* Affichage du bouton servant d'icone*/}
        <IconButton>
           {/* Affichage de l'icone au centre du cercle*/}
          <MaterialIcon style={{ color: "#6C5DBB", fontSize:"50px" }} />
          {/* Stylez la couleur de l'icône selon vos besoins */}
        </IconButton>
      </StyledCircle>
    </div>
  );
};

export default GrandeIcone;