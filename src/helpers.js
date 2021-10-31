export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const cleanFalsyFields = (obj, onlyKeys = []) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v || v === ''));

export function parseErrors(errors, flatt = true) {
  return errors;
}

/**
 *
 * @param func
 * @param timeout
 */
export function debounce(func, timeout) {

}

/**
 *
 * @param {Object} obj
 * @param {Array|null} fillable
 * @returns {FormData}
 */
export function convertObjectToFormData(obj, fillable = null) {
  const allowedKeys = fillable ? getAllowedKeysInObject(obj, fillable) : Object.keys(obj);

  return allowedKeys.reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
  }, new FormData);
}

/**
 *
 * @param {Object} obj
 * @param {Array} allowedKeys
 * @returns {string[]}
 */
export function getAllowedKeysInObject(obj, allowedKeys) {
  return Object.keys(obj).filter((key) => allowedKeys.includes(key));
}

/**
 *
 * @param {Array} arr
 * @param {Function} search
 * @param {any} replaceBy
 */
export function replaceInArray(arr, search, replaceBy) {
  const replacedIndex = arr.findIndex(search);
  if (replacedIndex !== -1) {
    arr.splice(replacedIndex, 1, replaceBy);
  }
}

/**
 *
 * @param {Array} arr
 * @param {Function} search
 */
export function removeInArray(arr, search) {
  const replacedIndex = arr.findIndex(search);
  if (replacedIndex !== -1) {
    arr.splice(replacedIndex, 1);
  }
}
