export const TournamentStatuses = {
  not_started: 'not_started',
  current: 'current',
  archived: 'archived',
};

export function getPrintableTournamentStatuses() {
  return {
    not_started: 'Не начат',
    current: 'Текущий',
    archived: 'Архивирован',
  };
}

export function getPrintableTournamentStatus(type) {
  const types = getPrintableTournamentStatuses();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
