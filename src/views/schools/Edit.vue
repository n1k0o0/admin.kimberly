<template>
  <el-card
    v-loading="loading"
    class="schools-edit"
  >
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
            <el-input
              v-model="school.branch_count"
              type="number"
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
      <el-col :span="10">
        <el-divider content-position="left">
          <span class="d-block h4">Социальные сети</span>
        </el-divider>
<!--        <social-links-list-->
<!--          :social-links="school.social_links"-->
<!--          :edit-social-link-clicked="handleEditSocialLinkClicked"-->
<!--          :remove-social-link-clicked="handleRemoveSocialLinkClicked"-->
<!--        />-->
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="10">
        <el-divider content-position="left">
          <span class="d-block h4">Команды</span>
        </el-divider>
        <teams
          :teams="school.teams"
          @create-team="handleTeamCreated"
          @edit-team="handleTeamEdited"
          @remove-team="handleTeamRemoved"
        />
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="10">
        <el-divider content-position="left">
          <span class="d-block h4">Тренера</span>
        </el-divider>
        <coaches
          :coaches="school.coaches"
          @create-coach="handleCoachCreated"
          @edit-coach="handleCoachEdited"
          @remove-coach="handleCoachRemoved"
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
import { getPrintableSchoolStatus } from "@/services/schools/School.js";
import { createTeam, removeTeam, updateTeam } from "@/services/schools/teams/teams.js";
import { createCoach, removeCoach, updateCoach } from "@/services/schools/coaches/coaches.js";
import useCountryAndCity from "@/composables/useCountryAndCity.js";
import SingleImageUploader from "@/components/common/SingleImageUploader.vue";
import Coaches from "@/components/schools/coaches/Coaches.vue";
import Teams from "@/components/schools/teams/Teams.vue";
import { removeInArray, replaceInArray } from "@/helpers.js";

export default {
  name: "Edit",
  components: {
    Teams,
    Coaches,
    SingleImageUploader,
  },
  setup() {
    const { loading, setLoaded, setLoading } = useLoadingState(false);
    const route = useRoute();
    let schoolId = computed(() => route.params.id);
    let school = ref({});
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

    const handleSocialLinkEdited = (socialLink) => {

    }
    const handleSocialLinkRemoved = async (socialLink) => {

    }

    const handleTeamCreated = async (team) => {
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

    const handleTeamEdited = async (team) => {
      try {
        setLoading();
        const { data } = await updateTeam(team.value.id, team.value);
        replaceInArray(school.value.teams, (teamItem) => teamItem.id === team.value.id, data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    }

    const handleTeamRemoved = async (team) => {
      try {
        setLoading();
        await removeTeam(team.id);
        removeInArray(school.value.teams, (teamItem) => teamItem.id === team.id);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    }

    const handleCoachCreated = async (coach) => {
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

    const handleCoachEdited = async (coach) => {
      try {
        setLoading();
        const { data } = await updateCoach(coach.value.id, coach.value);
        replaceInArray(school.value.coaches, (coachItem) => coachItem.id === coach.value.id, data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    }

    const handleCoachRemoved = async (coach) => {
      try {
        setLoading();
        await removeCoach(coach.id);
        removeInArray(school.value.coaches, (coachItem) => coachItem.id === coach.id);
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    }

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
      handleTeamCreated,
      handleCoachCreated,
      handleSocialLinkEdited,
      handleSocialLinkRemoved,
      handleTeamEdited,
      handleTeamRemoved,
      handleCoachEdited,
      handleCoachRemoved,
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
