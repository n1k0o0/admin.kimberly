export const SchoolStatuses = {
  moderation: 'moderation',
  published: 'published',
};

export function getPrintableSchoolStatuses() {
  return {
    moderation: 'На модерации',
    published: 'Опубликована',
  };
}

export function getPrintableSchoolStatus(type) {
  const types = getPrintableSchoolStatuses();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
