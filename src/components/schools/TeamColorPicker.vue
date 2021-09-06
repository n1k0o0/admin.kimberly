<template>
  <span>Выберите цвет</span>
  <el-row>
    <el-select
      v-model="selectedColorId"
      class="d-block"
      placeholder="Выберите цвет"
      @change="onColorSelected"
    >
      <el-option
        v-for="color in colors"
        :key="color.id"
        :label="color.color"
        :value="color.id"
      />
    </el-select>
  </el-row>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TeamColorPicker",
  props: {
    colorId: {
      type: Number,
      default: null,
    }
  },
  emits: ['color-selected'],
  setup(props, { emit }) {
    const selectedColorId = ref(props.colorId);
    const colors = ref([
      {
        id: 1,
        color: 'red',
        rgb: '#ff0000'
      },
      {
        id: 2,
        color: 'green',
        rgb: '#00ff00'
      },
      {
        id: 3,
        color: 'blue',
        rgb: '#0000ff'
      },
    ]);

    const onColorSelected = (color) => emit('color-selected', colors.value.find(colorItem => colorItem.id === selectedColorId.value));

    return {
      selectedColorId,
      colors,
      onColorSelected,
    };
  }
};
</script>

<style scoped>

</style>
