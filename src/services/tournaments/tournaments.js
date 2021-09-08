import api from "@/services/api.js";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/tournaments'

const fillable = [];

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

export function getTournament(tournamentId) {
  return api.get(`${ENDPOINT}/${tournamentId}`)
}

export function updateTournament(tournamentId, fields) {
  return api.put(`${ENDPOINT}/${tournamentId}`, cleanFalsyFields(fields))
}

export function removeTournament(tournamentId) {
  return api.delete(`${ENDPOINT}/${tournamentId}`)
}

export function updateTournamentStatus(tournamentId, status) {
  return api.put(`${ ENDPOINT }/${ tournamentId }/status`, cleanFalsyFields({status}, fillable));
}
