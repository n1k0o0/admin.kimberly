import api from "@/services/api.js";

const ENDPOINT = '/social-links';

export function createSocialLink(school_id, fields) {
  return api.post(`${ ENDPOINT }`, {
    ...fields,
    school_id,
  });
}

export function removeSocialLink(coach_id) {
  return api.delete(`${ ENDPOINT }/${ coach_id }`);
}

export function updateSocialLink(coach_id, fields) {
  return api.put(`${ ENDPOINT }/${ coach_id }`, fields);
}
