export const colors = {
  red: 'red',
  green: 'green',
  blue: 'blue',
};

export const colorHexes = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
};

export function getPrintableColors() {
  return {
    red: 'красный',
    green: 'зеленый',
    blue: 'синий',
  };
}

export function getColorHex() {
  if (colorHexes.hasOwnProperty(color)) {
    return colorHexes[color];
  }

  return '#000';
}

export function getPrintableColor(color) {
  const colors = getPrintableColors();
  if (colors.hasOwnProperty(color)) {
    return colors[color];
  }

  return '';
}
