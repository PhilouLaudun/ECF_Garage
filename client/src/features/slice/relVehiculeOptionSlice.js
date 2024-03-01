import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // import des fonctions de création d'un slice et de création de fonctions asynchrones
import service from "../../services/service"; //import de la fonction permettant de gérer les demandes au serveur à l'aide d'AXIOS

//fonction permettant d'ajouter une relation entre vehicule et equipement à la base de données
export const createRelVehOpt = createAsyncThunk(
  "relVehiculeOption/create",
  async (vehiculeId) => {
    const res = await service.createRelVehOpt(vehiculeId);
    return res.data;
  }
);
// fonction permettant de récupérer la liste des options pour un vehicule
export const listRelVehOpt = createAsyncThunk(
  "relVehiculeOption/liste",
  async (data) => {
    const res = await service.listRelVehOpt(data);
    return res.data;
  }
);
//fonction permettant de supprimer une relation 
export const delRelVehOpt = createAsyncThunk(
  "relVehiculeOption/liste",
  async (id_relVehOpt) => {
    const res = await service.delRelVehOpt(id_relVehOpt);

    return res.data;
  }
);


