import api from "../api";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/schools';

const fillable = [];

export function paginateSchools(search, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  };
  if (search) {
    params = { ...params, ...cleanFalsyFields(search, fillable) };
  }

  return api.get(`${ ENDPOINT }/`, {
    params
  });
}

export function createSchool(fields) {
  return api.post(`${ ENDPOINT }`, fields);
}

export function getSchool(id) {
  return api.get(`${ ENDPOINT }/${ id }`);
}

export function updateSchool(id, fields) {
  return api.put(`${ ENDPOINT }/${ id }`, cleanFalsyFields(fields));
}

export function removeSchool(id) {
  return api.delete(`${ ENDPOINT }/${ id }`);
}

export function getSchools() {

}
