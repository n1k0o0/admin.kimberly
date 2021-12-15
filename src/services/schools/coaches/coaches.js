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

export function updateCoach(coach_id, data) {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  Object.keys(data).forEach(function (key) {
    if(data[key]==='null' || data[key]===null) {
      data[key]=''
    }
    if (!(data[key] instanceof File) && key === 'avatar' && data[key] !== '' && data[key] !== null) {
      return
    }
    formData.append(`${key}`, data[key])
  })
  return api.post(`${ ENDPOINT }/${ coach_id }`, formData);
}
