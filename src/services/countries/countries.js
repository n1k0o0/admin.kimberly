import api from "../api";
import { cleanFalsyFields } from "../../helpers";

const ENDPOINT = '/countries'

export function paginateCountries(search, page = 1, limit = 10) {
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

export function createCountry(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getCountry(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function updateCountry(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeCountry(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}
