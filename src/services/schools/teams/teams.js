import api from "@/services/api.js";

const ENDPOINT = '/teams';

export function createTeam(school_id, fields) {
  return api.post(`${ ENDPOINT }`, {
    ...fields,
    school_id,
  });
}

export function removeTeam(team_id) {

}

export function updateTeam(team_id, fields) {

}
