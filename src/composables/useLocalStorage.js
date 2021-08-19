import { ref, watch } from 'vue'

function getSavedValue(key, initialValue) {
  const item = JSON.parse(localStorage.getItem(key))
  if (item) {
    return item
  }

  return initialValue
}

export default function useLocalStorage(key, initialValue) {
  const item = ref(getSavedValue(key, initialValue))

  watch(item, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  })

  const removeValue = () => {
    item.vaue = null
    localStorage.removeItem(key)
  }

  return {
    removeValue,
    item
  }
}
