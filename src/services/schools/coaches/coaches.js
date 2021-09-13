import api from "@/services/api.js";
import { convertObjectToFormData } from "@/helpers.js";

const ENDPOINT = '/coaches';

export function createCoach(school_id, fields) {
  const formData = convertObjectToFormData({ ...fields, school_id });
  return api.post(`${ ENDPOINT }`, formData);
}

export function removeCoach(coach_id) {
  return api.delete(`${ ENDPOINT }/${ coach_id }`);
}

export function updateCoach(coach_id, fields) {
  const formData = convertObjectToFormData({ ...fields, coach_id, _method: 'PUT' });
  return api.post(`${ ENDPOINT }/${ coach_id }`, formData);
}
