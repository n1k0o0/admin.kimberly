import api from "../api";
import { cleanFalsyFields } from "@/helpers.js";

const ENDPOINT = '/notifications'

export function getNotifications(search, page = 1, limit = 10) {
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

