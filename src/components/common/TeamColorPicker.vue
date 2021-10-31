<template>
  <span>Выберите цвет</span>
  <el-row>
    <el-select
      v-model="selectedColorId"
      class="d-block"
      clearable
      placeholder="Выберите цвет"
      :disabled="disabled"
      @change="onColorSelected"
    >
      <el-option
        v-for="color in availableColors"
        :key="color.id"
        :label="color.name"
        :value="color.id"
      />
    </el-select>
  </el-row>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'TeamColorPicker',
  props: {
    colorId: {
      type: Number,
      default: null,
    },
    disabledColors: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['color-selected'],
  setup (props, { emit }) {
    const selectedColorId = ref(props.colorId)
    const colors = ref([
      {
        id: 1,
        color: 'red',
        name: 'красный',
        rgb: '#ff0000'
      },
      {
        id: 2,
        color: 'green',
        name: 'зеленый',
        rgb: '#00ff00'
      },
      {
        id: 3,
        color: 'blue',
        name: 'синий',
        rgb: '#0000ff'
      },
    ])

    let availableColors = computed(() => colors.value.filter(el => !props.disabledColors.includes(el.id)))
    const onColorSelected = (color) => {
      emit('color-selected', colors.value.find(colorItem => colorItem.id === selectedColorId.value))
    }

    return {
      selectedColorId,
      availableColors,
      colors,
      onColorSelected,
    }
  }
}
</script>

<style scoped>

</style>
