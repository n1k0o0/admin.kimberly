<template>
  <el-card
    v-loading="loading"
    class="schools-edit"
  >
    <template #header>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row>
          <span class="d-block h4">Редактирование школы</span>
        </el-row>
        <el-row v-if="school.status === SchoolStatuses.moderation">
          <el-popconfirm
            cancel-button-text="Отмена"
            confirm-button-text="Да"
            title="Опубликовать школу?"
            @confirm="handlePublishSchoolClicked"
          >
            <template #reference>
              <el-button type="primary">
                Опубликовать
              </el-button>
            </template>
          </el-popconfirm>
        </el-row>
      </el-row>
    </template>
    <el-row>
      <el-col :span="12">
        <el-row class="mb-5">
          <span class="d-block h4">Название школы</span>
          <el-input
            v-model="school.name"
            placeholder="Название школы"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Описание школы</span>
          <el-input
            v-model="school.description"
            :rows="2"
            placeholder="Please input"
            type="textarea"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Email</span>
          <el-input
            v-model="school.email"
            placeholder="Email"
          />
        </el-row>
        <el-row class="mb-5">
          <span class="d-block h4">Телефон</span>
          <el-input
            v-model="school.phone"
            placeholder="Телефон"
          />
        </el-row>
        <el-row class="mb-5">
          <div class="d-block ">
            <span class="d-block h4">Количество филиалов</span>
            <el-input
              v-model="school.branch_count"
              placeholder="Количество филиалов"
              type="number"
            />
          </div>
        </el-row>
        <el-row
          class="flex-column"
        >
          <span class="d-block h4">Аватар</span>
          <single-image-uploader
            :hide-upload-icon="!!school.avatar"
            :image="school.avatar"
            :on-change="handleAvatarChanged"
            :on-remove="handleAvatarRemoved"
          />
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="24">
        <el-divider content-position="left">
          <span class="d-block h4">Социальные сети</span>
        </el-divider>
        <el-row :gutter="10">
          <el-col
            :span="6"
            :xs="12"
          >
            <label>
              YOUTUBE
              <el-input v-model="school.youtube_link" />
            </label>
          </el-col>
          <el-col
            :span="6"
            :xs="12"
          >
            <label>
              INSTAGRAM
              <el-input v-model="school.inst_link" />
            </label>
          </el-col>
          <el-col
            :span="6"
            :xs="12"
          >
            <label>
              VK
              <el-input v-model="school.vk_link" />
            </label>
          </el-col>
          <el-col
            :span="6"
            :xs="12"
          >
            <label>
              DIAGRAM
              <el-input v-model="school.diagram_link" />
            </label>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="24">
        <el-divider content-position="left">
          <span class="d-block h4">Команды</span>
        </el-divider>
        <teams
          :leagues="availableLeagues"
          :teams="school.teams"
          @create-team="handleTeamCreated"
          @edit-team="handleTeamEdited"
          @remove-team="handleTeamRemoved"
        />
      </el-col>
    </el-row>
    <el-row class="mb-5">
      <el-col :span="24">
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
        <el-button
          type="primary"
          @click="updateSchoolClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {getSchool, updateSchool, updateSchoolStatus, uploadSchoolAvatar} from '@/services/schools/schools.js'
import {getPrintableSchoolStatus, SchoolStatuses} from '@/services/schools/School.js'
import {createTeam, removeTeam, updateTeam} from '@/services/schools/teams/teams.js'
import {createCoach, removeCoach, updateCoach} from '@/services/schools/coaches/coaches.js'
import SingleImageUploader from '@/components/common/SingleImageUploader.vue'
import Coaches from '@/components/schools/coaches/Coaches.vue'
import Teams from '@/components/schools/teams/Teams.vue'
import {removeInArray, replaceInArray} from '@/helpers.js'
import {createSocialLink, removeSocialLink, updateSocialLink} from '@/services/schools/social-links/socialLinks.js'
import {paginateLeagues} from '@/services/leagues/leagueService.js'

export default {
  name: 'Edit',
  components: {
    Teams,
    Coaches,
    SingleImageUploader,
  },
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(false)
    const route = useRoute()
    let schoolId = computed(() => route.params.id)
    let school = ref({})
    const availableLeagues = ref({})

    onMounted(async () => {
      try {
        schoolId = route.params.id
        setLoading()
        const {data} = await getSchool(schoolId)
        const {data: {data: leagueItems}} = await paginateLeagues({city_id: data.city_id}, null, 0)
        school.value = data
        availableLeagues.value = leagueItems
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    })

    watch(
      () => route.params.id,
      async () => {
        if (!route.params.id) return
        try {
          setLoading()
          const {data} = await getSchool(route.params.id)
          school.value = data
        } catch (e) {
          console.log(e)
        } finally {
          setLoaded()
        }
      }
    )
    const updateSchoolClicked = async () => {
      try {
        setLoading()
        let {
          name,
          description,
          email,
          phone,
          branch_count,
          vk_link,
          youtube_link,
          inst_link,
          diagram_link
        } = school.value
        await updateSchool(schoolId, {
          name,
          description,
          email,
          phone,
          branch_count,
          vk_link,
          youtube_link,
          inst_link,
          diagram_link
        })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const updateSchoolFields = async (fields) => {
      try {
        setLoading()
        await updateSchool(schoolId, fields)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onSchoolCountrySelected = (country) => school.value.country_id = country.id
    const onSchoolCitySelected = (city) => {
      school.value.city_id = city.id
      updateSchoolFields({city_id: city.id})
    }

    const handleAvatarRemoved = async (file) => {
      school.value.avatar = null
    }

    const handleAvatarChanged = async (file, fileList) => {
      try {
        setLoading()
        await uploadSchoolAvatar(schoolId, file.raw)
        school.value.avatar = file
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleSocialLinkCreated = async (socialLink) => {
      try {
        setLoading()
        const {data} = await createSocialLink(schoolId, socialLink)
        school.value.social_links.push(data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleSocialLinkEdited = async (socialLink) => {
      try {
        setLoading()
        const {data} = await updateSocialLink(socialLink.value.id, socialLink.value)
        replaceInArray(school.value.social_links, (socialLinkItem) => socialLinkItem.id === socialLink.value.id, data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleSocialLinkRemoved = async (socialLink) => {
      try {
        setLoading()
        await removeSocialLink(socialLink.id)
        removeInArray(school.value.social_links, (socialLinkItem) => socialLinkItem.id === socialLink.id)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleTeamCreated = async (team) => {
      try {
        setLoading()
        const {data} = await createTeam(schoolId, team)
        school.value.teams.push(data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleTeamEdited = async (team) => {
      try {
        setLoading()
        const {data} = await updateTeam(team.value.id, team.value)
        replaceInArray(school.value.teams, (teamItem) => teamItem.id === team.value.id, data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleTeamRemoved = async (team) => {
      try {
        setLoading()
        await removeTeam(team.id)
        removeInArray(school.value.teams, (teamItem) => teamItem.id === team.id)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleCoachCreated = async (coach) => {
      try {
        setLoading()
        const {data} = await createCoach(schoolId, coach)
        school.value.coaches.push(data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleCoachEdited = async (coach) => {
      try {
        setLoading()
        const {data} = await updateCoach(coach.value.id, coach.value)
        replaceInArray(school.value.coaches, (coachItem) => coachItem.id === coach.value.id, data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handleCoachRemoved = async (coach) => {
      try {
        setLoading()
        await removeCoach(coach.id)
        removeInArray(school.value.coaches, (coachItem) => coachItem.id === coach.id)
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    const handlePublishSchoolClicked = async () => {
      try {
        setLoading()
        await updateSchoolStatus(schoolId, SchoolStatuses.published)
        school.value.status = 'published'
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

    return {
      SchoolStatuses,
      getPrintableSchoolStatus,
      availableLeagues,
      loading,
      school,
      handleAvatarRemoved,
      handleAvatarChanged,
      onSchoolCountrySelected,
      onSchoolCitySelected,
      handleSocialLinkCreated,
      handleSocialLinkEdited,
      handleSocialLinkRemoved,
      handleTeamCreated,
      handleTeamEdited,
      handleTeamRemoved,
      handleCoachCreated,
      handleCoachEdited,
      handleCoachRemoved,
      handlePublishSchoolClicked,
      updateSchoolClicked
    }
  },
}
</script>

<style lang="scss" scoped>
.schools-edit {
  &__status {
    color: red;
  }
}
</style>
