<template>
  <el-card
    v-loading="loading"
    class="schools-edit"
  >
    <template #header>
      <el-card>
        <el-row
          class="mb-5 flex-row-reverse "
        >
          <span class="schools-edit__status">
            {{ getPrintableSchoolStatus(school.status) }}
          </span>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-avatar
              class="avatar"
              :size="50"
              :icon="'fas fa-white fa-user'"
              :src="school?.avatar?.url"
            />
          </el-col>
          <el-col :span="10">
            {{ school.name }}
            <el-rate :value="3" />
            1 из 100 в городе {{ school.city?.name }}
          </el-col>
        </el-row>
      </el-card>
    </template>
    <el-row>
      <el-col :span="12">
        <el-row class="mb-5">
          <span class="d-block h4">Название школы</span>
          <el-input
            v-model="school.name"
            placeholder="Название школы"
            @input="onSchoolNameChanged"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Описание школы</span>
          <el-input
            v-model="school.description"
            type="textarea"
            :rows="2"
            placeholder="Please input"
            @input="onSchoolDescriptionChanged"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Email</span>
          <el-input
            v-model="school.email"
            placeholder="Email"
            @input="onSchoolEmailChanged"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Телефон</span>
          <el-input
            v-model="school.phone"
            placeholder="Телефон"
            @input="onSchoolPhoneChanged"
          />
        </el-row>
        <el-row class="mb-5">
          <div class="d-block ">
            <span class="d-block h4">Количество филиалов</span>
            <el-input-number
              v-model="school.branch_count"
              placeholder="Количество филиалов"
              @input="onSchoolBranchCountChanged"
            />
          </div>
        </el-row>
        <el-row
          class="flex-column"
        >
          <span class="d-block h4">Аватар</span>
          <single-image-uploader
            :image="school.avatar"
            :hide-upload-icon="school.avatar"
            :on-remove="handleAvatarRemoved"
            :on-change="handleAvatarChanged"
          />
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="6">
        <span class="d-block h4">Социальные сети</span>
        <social-links-list :social-links="school.social_links" />
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="8">
        <span class="d-block h4">Команды</span>
        <teams-table :teams="school.teams" />
        <span class="d-block h4">Добавить команду</span>
        <create-team
          :leagues="availableLeagues"
          @team-created="onTeamCreated"
        />
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="8">
        <span class="d-block h4">Тренера</span>
        <coaches-table :coaches="school.coaches" />
        <span class="d-block h4">Добавить тренера</span>
        <create-coach
          class="flex-row"
          @coach-created="onCoachCreated"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'schools'})">
          Закрыть
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { getSchool, updateSchool, uploadSchoolAvatar } from "@/services/schools/schools.js";
import CoachesTable from "@/components/schools/CoachesTable.vue";
import TeamsTable from "@/components/schools/TeamsTable.vue";
import { getPrintableSchoolStatus } from "@/services/schools/School.js";
import CreateTeam from "@/components/schools/CreateTeam.vue";
import CreateCoach from "@/components/schools/CreateCoach.vue";
import { createTeam } from "@/services/schools/teams/teams.js";
import { createCoach } from "@/services/schools/coaches/coaches.js";
import SocialLinksList from "@/components/schools/SocialLinksList.vue";
import useCountryAndCity from "@/composables/useCountryAndCity.js";
import SingleImageUploader from "@/components/common/SingleImageUploader.vue";

export default {
  name: "Edit",
  components: {
    SingleImageUploader,
    SocialLinksList,
    CreateCoach,
    CreateTeam,
    TeamsTable,
    CoachesTable
  },
  setup() {
    const route = useRoute();

    let school = ref({});

    let schoolId = computed(() => route.params.id);
    const { loading, setLoaded, setLoading } = useLoadingState(false);
    const { selectedCity } = useCountryAndCity();
    const availableLeagues = computed(() => selectedCity.value?.leagues ?? []);
    onMounted(async () => {
      try {
        schoolId = route.params.id;
        setLoading();
        const { data } = await getSchool(schoolId);
        school.value = data;
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    });

    watch(
      () => route.params.id,
      async schoolId => {
        try {
          setLoading();
          const { data } = await getSchool(schoolId);
          school.value = data;
        } catch (e) {
          console.log(e);
        } finally {
          setLoaded();
        }
      }
    );

    const updateSchoolFields = async (fields) => {
      try {
        setLoading();
        await updateSchool(schoolId, fields);
      } catch (e) {
      } finally {
        setLoaded();
      }
    };
    const onSchoolNameChanged = () => updateSchoolFields({ name: school.value.name });
    const onSchoolDescriptionChanged = () => updateSchoolFields({ description: school.value.description });
    const onSchoolCountrySelected = (country) => school.value.country_id = country.id;
    const onSchoolCitySelected = (city) => {
      school.value.city_id = city.id;
      updateSchoolFields({ city_id: city.id });
    };
    const onSchoolPhoneChanged = () => updateSchoolFields({ phone: school.value.phone });
    const onSchoolEmailChanged = () => updateSchoolFields({ email: school.value.email });
    const onSchoolBranchCountChanged = () => updateSchoolFields({ branch_count: school.value.branch_count });

    const onTeamCreated = async (team) => {
      try {
        setLoading();
        const { data } = await createTeam(schoolId, team);
        school.value.teams.push(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    };
    const onCoachCreated = async (coach) => {
      try {
        setLoading();
        const { data } = await createCoach(schoolId, coach);
        school.value.coaches.push(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    };

    const handleAvatarRemoved = async (file) => {
      school.value.avatar = null;
    };

    const handleAvatarChanged = async (file, fileList) => {
      try {
        setLoading();
        const { data } = await uploadSchoolAvatar(schoolId, file.raw);
        school.value.avatar = file;
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    };

    return {
      getPrintableSchoolStatus,
      availableLeagues,
      loading,
      school,
      handleAvatarRemoved,
      handleAvatarChanged,
      onSchoolNameChanged,
      onSchoolDescriptionChanged,
      onSchoolPhoneChanged,
      onSchoolBranchCountChanged,
      onSchoolEmailChanged,
      onSchoolCountrySelected,
      onSchoolCitySelected,
      onTeamCreated,
      onCoachCreated,
    };
  },
};
</script>

<style scoped lang="scss">
.schools-edit {
  &__status {
    color: red;
  }
}
</style>
