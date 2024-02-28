import React from 'react'// chargement des composants react
// import des composants mui material
import { styled } from "@mui/system";
//import des icones mui material
import { IconButton } from "@mui/material";
// style du cercel autour de l'icone
    const StyledCircle = styled("div")({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#BAEE0C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        "& .MuiSvgIcon-root": {
          color: "black !important", // Couleur de l'icône au survol
        },
      },
      "@media (max-width: 420px)": {
        width: "40px",
        height: "40px",
        // Ajoutez d'autres styles selon vos besoins
      },
    });
//
// compsant PetitreIcone (props passées : materialIcon : nom de l'icone à afficher)
const PetiteIcone = ({ materialIcon: MaterialIcon }) => {
  return (
    <div>
      <StyledCircle>
        <IconButton>
          <MaterialIcon style={{ color: "#FFFFFF" }} />
          {/* Stylez la couleur de l'icône selon vos besoins */}
        </IconButton>
      </StyledCircle>
    </div>
  );
};

export default PetiteIcone