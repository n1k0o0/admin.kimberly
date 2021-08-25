import api from "../api";
import { cleanFalsyFields } from "../../helpers";

const ENDPOINT = '/divisions'

export function createDivision(league_id, fields) {
  return api.post(`${ENDPOINT}`, { ...fields, league_id })
}

export function updateDivision(id, fields) {
  return api.put(`${ENDPOINT}/${id}`, cleanFalsyFields(fields))
}

export function removeDivision(id) {
  return api.delete(`${ENDPOINT}/${id}`)
}
