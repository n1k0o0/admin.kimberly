import api from "../api";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/games'

export function paginateGames(search, page = 1, limit = 10) {
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

export function createGame(fields) {
  return api.post(`${ENDPOINT}`, fields)
}

export function getGame(id) {
  return api.get(`${ENDPOINT}/${id}`)
}

export function updateGame(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeGame(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}

export function loadGames(params) {
  return api.get(`${ENDPOINT}`, {
    params
  })
}

export function getPrintableGameStatuses() {
  return {
    not_started: 'Не начат',
    started: 'Начат',
    finished: 'Закончен',
  };
}

export function getPrintableGameStatus(type) {
  const types = getPrintableGameStatuses();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
