
import React from "react";// chargement des composants react
// style des fléches du carroussel
const CustomPrevArrow = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      display: "block",
      background: "black", // Changez la couleur selon vos besoins
      color: "white",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      opacity: "1",
      zIndex: "10",
    }}
  />
);

const CustomNextArrow = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      display: "block",
      background: "black", // Changez la couleur selon vos besoins
      color: "white",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
      zIndex: "10",
    }}
  />
);

export { CustomPrevArrow, CustomNextArrow };
