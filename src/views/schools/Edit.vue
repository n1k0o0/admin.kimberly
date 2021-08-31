<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ school.title }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          v-model="school.title"
          placeholder="Название"
        />
      </el-col>
    </el-row>
    <country-city-selectors
      v-if="!loading"
      :selected-country-id="school.country_id"
      :selected-city-id="school.city_id"
    />
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите адрес</span>
        <el-input
          v-model="school.address"
          placeholder="Адрес"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'schools'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onUpdateSchoolClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import CountryCitySelectors from "@/components/common/CountryCitySelectors.vue";
import { getSchool, updateSchool } from "@/services/schools/schools.js";

export default {
  name: "Edit",
  components: { CountryCitySelectors },
  setup() {
    const route = useRoute()
    let school = ref({});

    let schoolId = computed(() => route.params.id)
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    onMounted(async () => {
      try {
        schoolId = route.params.id
        console.log(schoolId);
        setLoading()
        const {data} = await getSchool(schoolId)
        school.value = data
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    })

    watch(
      () => route.params.id,
      async schoolId => {
        try {
          setLoading()
          const {data} = await getSchool(schoolId)
          school.value = data
        } catch (e) {
          console.log(e)
        } finally {
          setLoaded()
        }
      }
    )

    const onUpdateSchoolClicked = async () => {
      try {
        setLoading()
        await updateSchool(schoolId, school.value)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
      loading,
      school,
      onUpdateSchoolClicked,
    }
  },
}
</script>

<style scoped>

</style>
