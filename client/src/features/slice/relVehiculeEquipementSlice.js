import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

//fonction permettant d'ajouter une relation entre vehicule et equipement à la base de données
export const createRelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/create",
  async (vehiculeId) => {
    const res = await service.createRelVehEquip(vehiculeId);
    return res.data;
  }
);
//fonction permettant de charger la liste des équipement pour un vehicule
export const listRelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/liste",
  async (data) => {
    const res = await service.listRelVehEquip(data);
    return res.data;
  }
);
//fonction permettant de supprimer une relation 
export const deleteRelVelVehEquip = createAsyncThunk(
  "relVehiculeEquipement/delete",
  async (id_relVehEquip) => {
    const res = await service.delRelVehEquip(id_relVehEquip);

    return res.data;
  }
);


