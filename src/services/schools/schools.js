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

export function updateSchool(schoolId, fields) {
  return api.put(`${ ENDPOINT }/${ schoolId }`, cleanFalsyFields(fields));
}

export function removeSchool(id) {
  return api.delete(`${ ENDPOINT }/${id}`);
}

export function uploadSchoolAvatar(schoolId, file) {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append('avatar', file);

  return api.post(`${ ENDPOINT }/${ schoolId }`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function updateSchoolStatus(schoolId, status) {
  return api.put(`${ ENDPOINT }/${ schoolId }/status`, cleanFalsyFields({status}));
}
