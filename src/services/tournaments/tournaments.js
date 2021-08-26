import api from "../api";
import { cleanFalsyFields } from "../../helpers";

const ENDPOINT = '/tournaments'

export function paginateTournaments(search, page = 1, limit = 10) {
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

export function createTournament(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getTournament(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function updateTournament(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeTournament(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}
