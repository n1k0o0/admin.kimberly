import api from "@/services/api.js";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/tournaments'

const fillable = [];

export function paginateTournaments(search, page = 1, limit = 10) {
  let params
  if (limit){
    params = {
      page,
      limit,
    }
  }else {
    params = {
      page,
    }
  }

  if (search) {
    params = {...params, ...cleanFalsyFields(search)}
  }

  return api.get(`${ENDPOINT}/`, {
    params
  })
}

export function getCurrentTournament(search) {
   let params = { ...cleanFalsyFields(search)}
  return api.get(`${ENDPOINT}/current`,{params})
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
