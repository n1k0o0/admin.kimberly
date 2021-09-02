<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ stadium.title }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          v-model="stadium.title"
          placeholder="Название"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите адрес</span>
        <el-input
          v-model="stadium.address"
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
          @click="onUpdateStadiumClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { getStadium, updateStadium } from "@/services/stadiums/stadiums.js";

export default {
  name: "Edit",
  setup() {
    const route = useRoute();
    const router = useRouter();

    let stadiumId = null;
    let stadium = ref({});

    const { loading, setLoaded, setLoading } = useLoadingState(false);

    onMounted(async () => {
      try {
        stadiumId = route.params.id;
        setLoading();
        const { data } = await getStadium(stadiumId);
        stadium.value = data;
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    });

    const onUpdateStadiumClicked = async () => {
      try {
        setLoading();
        await updateStadium(stadiumId, stadium.value);
        await router.push({ name: 'stadiums' });
      } catch (e) {
      } finally {
        setLoaded();
      }
    };

    return {
      loading,
      stadium,
      onUpdateStadiumClicked,
    };
  },
};
</script>

<style scoped>

</style>
