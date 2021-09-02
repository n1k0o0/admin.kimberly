export const SocialLinkServices = {
  instagram: 'instagram',
  vk: 'vk',
};

export function getPrintableSocialLinkServices() {
  return {
    instagram: 'Инстаграм',
    vk: 'ВКонтакте',
  };
}

export function getPrintableSocialLinkService(type) {
  const types = getPrintableSocialLinkServices();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
