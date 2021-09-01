export const SchoolStatuses = {
  MODERATION: 'MODERATION',
  PUBLISHED: 'PUBLISHED',
};

export function getPrintableSchoolStatuses() {
  return {
    MODERATION: 'На модерации',
    PUBLISHED: 'Опубликована',
  };
}

export function getPrintableSchoolStatus(type) {
  const types = getPrintableSchoolStatuses();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
