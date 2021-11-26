import api from "../api";
import {cleanFalsyFields} from "@/helpers.js";

const ENDPOINT = '/games'

export function paginateGames(search, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  }
  if (search) {
    params = {...params, ...cleanFalsyFields(search)}
  }

  return api.get(`${ENDPOINT}/schedule`, {
    params
  })
}

export function getAdminSchedule(search, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  }
  if (search) {
    params = {...params, ...cleanFalsyFields(search)}
  }

  return api.get(`${ENDPOINT}/schedule_admin`, {
    params
  })
}

export function getSchedule(search, page = 1, limit = 10) {
  let params = {
    page,
    limit,
  }
  if (search) {
    params = {...params, ...cleanFalsyFields(search)}
  }

  return api.get(`${ENDPOINT}/schedule`, {
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

export function updateGameStatistics(id, fields) {
  return api.put(`${ENDPOINT}/${id}/statistics`, cleanFalsyFields(fields))
}

export function deleteGoalAdmin(id, fields) {
  return api.put(`${ENDPOINT}/${id}/delete_goal_admin`, fields)
}

export function addGoalAdmin(id, fields) {
  return api.put(`${ENDPOINT}/${id}/add_goal_admin`, cleanFalsyFields(fields))
}

export function deleteGoalJury(id, fields) {
  return api.put(`${ENDPOINT}/${id}/delete_goal_jury`, fields)
}

export function addGoalJury(id, fields) {
  return api.put(`${ENDPOINT}/${id}/add_goal_jury`, cleanFalsyFields(fields))
}

export function changeStatus(id, fields) {
  return api.put(`${ENDPOINT}/${id}/status`, cleanFalsyFields(fields))
}

export function startPause(id) {
  return api.post(`${ENDPOINT}/${id}/pauses/start`)
}

export function finishPause(id) {
  return api.post(`${ENDPOINT}/${id}/pauses/finish`)
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
