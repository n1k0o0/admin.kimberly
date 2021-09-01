import api from "@/services/api.js";

const ENDPOINT = '/coaches';

export function createCoach(school_id, fields) {
  return api.post(`${ ENDPOINT }`, {
    ...fields,
    school_id,
  });
}

export function removeCoach(coach_id) {
  return api.delete(`${ ENDPOINT }/${ coach_id }`);
}

export function updateCoach(coach_id, fields) {
  return api.put(`${ ENDPOINT }/${ coach_id }`, fields);
}
