import api from "../api";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/users'

const fillable = [];

export async function paginateUsers(search=null, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  }

  if (search) {
    params = {...params, ...cleanFalsyFields(search, fillable)}
  }
  return api.get(`${ENDPOINT}/`, {
    params
  })
}

export function createUser(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getUser(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function removeUser(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}

export function updateUser(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function uploadUserAvatar(userId, file) {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append('avatar', file);

  return api.post(`${ ENDPOINT }/${ userId }`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
