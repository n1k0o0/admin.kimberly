export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const cleanFalsyFields = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v || v === '' ));

export function parseErrors (errors, flatt=true) {
  return errors
}
