import api from "@/services/api.js";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/stadiums'

export function paginateStadiums(search, page = 1, limit = 10) {
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

export function createStadium(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getStadium(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function updateStadium(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeStadium(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}
