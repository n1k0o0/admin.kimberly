export const colors = {
  red: 'red',
  blue: 'blue',
  green: 'green',
};

export function getPrintableColors() {
  return {
    red: 'red',
    blue: 'blue',
    green: 'green',
  };
}

export function getPrintableColor(color) {
  const colors = getPrintableColors();
  if (colors.hasOwnProperty(color)) {
    return colors[color];
  }

  return '';
}
