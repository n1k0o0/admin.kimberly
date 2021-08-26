export const TournamentTypes = {
  admin: 'admin',
  jury: 'jury',
}

export function getPrintableTournaments() {
  return {
    NOT_STARTED: 'Не начат',
    CURRENT: 'Текущий',
    STARTED: 'Архивирован',
  }
}

export function getPrintableTournamentType(type) {
  const types = getPrintableTournaments()
  if (types.hasOwnProperty(type)) {
    return types[type]
  }

  return ''
}
