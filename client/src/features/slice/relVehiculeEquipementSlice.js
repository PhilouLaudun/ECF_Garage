import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

//fonction permettant d'ajouter une relation entre vehicule et equipement à la base de données
export const createRelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/create",
  async (vehiculeId) => {
    // const data = { fk_structure: structureId, fk_prestation: prestatId };
console.log("vehiculeId", vehiculeId);
    const res = await service.createRelVehEquip(vehiculeId);
    return res.data;
  }
);
export const listRelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/liste",
  async (data) => {
    // const data = { fk_structure: structureId, fk_prestation: prestatId };
    const res = await service.listRelVehEquip(data);
    return res.data;
  }
);
//fonction permettant de supprimer une relation 
export const deleteRelVelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/liste",
  async (id_relVehEquip) => {
    console.log("Slice: id_relVehEquip", id_relVehEquip);
    const res = await service.delRelVehEquip(id_relVehEquip);

    return res.data;
  }
);


