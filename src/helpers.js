export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const cleanFalsyFields = (obj, onlyKeys=[]) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v || v === '' ));

export function parseErrors (errors, flatt=true) {
  return errors
}

export function debounce(func, timeout) {

}

export function objectToFormData(obj, fillable=[]) {
  const formData = new FormData;

  return formData;
}

export function replaceInArray(arr, search, replaceBy) {
  const replacedIndex = arr.findIndex(search);
  if (replacedIndex !== -1) {
    arr.splice(replacedIndex, 1, replaceBy);
  }
}

export function removeInArray(arr, search) {
  const replacedIndex = arr.findIndex(search);
  if (replacedIndex !== -1) {
    arr.splice(replacedIndex, 1);
  }
}
