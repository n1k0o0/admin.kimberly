import api from "../api";
import { cleanFalsyFields } from "../../helpers";

const ENDPOINT = '/internal_users'

export async function paginateInternalUsers(search=null, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  }

  if (search) {
    params = {...params, ...cleanFalsyFields(search)}
  }
  return api.get(`${ENDPOINT}/`, {
    params
  })
}

export function createInternalUser(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getInternalUser(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function removeInternalUser(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}

export function updateInternalUser(id, fields) {
  // TODO ADD FIELD WITH method
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}
