import api from "@/services/api.js";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/teams';

export function getTeams(search, page = 1, limit = 10) {
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

export function createTeam(school_id, fields) {
  return api.post(`${ ENDPOINT }`, {
    ...fields,
    school_id,
  });
}

export function removeTeam(team_id) {
  return api.delete(`${ ENDPOINT }/${ team_id }`);
}

export function updateTeam(team_id, fields) {
  return api.put(`${ ENDPOINT }/${ team_id }`, fields);
}
