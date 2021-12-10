<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать стадион</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          v-model="newStadium.title"
          placeholder="Название"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите адрес</span>
        <el-input
          v-model="newStadium.address"
          placeholder="Адрес"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'stadiums'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onCreateStadiumClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {reactive} from "vue";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {parseErrors} from "@/helpers.js";
import {useRouter} from "vue-router";
import {createStadium} from "@/services/stadiums/stadiums.js";
import useCountryAndCity from "@/composables/useCountryAndCity.js";

export default {
  name: "Create",
  setup() {
    const router = useRouter();
    const {selectedCityId} = useCountryAndCity();
    const {loading, setLoaded, setLoading} = useLoadingState(false);
    const newStadium = reactive({
      title: '',
      city_id: selectedCityId,
      address: '',
    });

    const onCitySelected = (city) => newStadium.city_id = city.value?.id;
    const onCreateStadiumClicked = async () => {
      try {
        setLoading();
        const {} = await createStadium(newStadium);
        await router.push({name: 'stadiums'});
      } catch (e) {
        const errors = parseErrors(e.response.data.errors);
        console.log(errors);
      } finally {
        setLoaded();
      }
    };

    return {
      loading,
      newStadium,
      onCitySelected,
      onCreateStadiumClicked,
    };
  },
};
</script>

<style scoped>

</style>
