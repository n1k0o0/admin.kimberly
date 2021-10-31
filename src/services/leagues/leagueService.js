import api from "../api";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/leagues'

export function paginateLeagues(search, page = 1, limit = 10) {
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

export function createLeague(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getLeague(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function updateLeague(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeLeague(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}

export function loadLeagues(params) {
  return api.get(`${ENDPOINT}`, {
    params
  })
}
