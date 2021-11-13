<template>
  <div
    class="back_arrow"
    @click="$router.push({name: 'games-jury'})"
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_102:601)">
        <path
          d="M22.5 26.25L15 19.5006L22.5 12.75"
          stroke="#181c32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <rect
        x="0.25"
        y="0.25"
        width="39.5"
        height="39.5"
        rx="15.75"
        stroke="#181c32"
        stroke-width="0.5"
      />
      <defs>
        <clipPath id="clip0_102:601">
          <rect
            width="17"
            height="11"
            fill="black"
            transform="translate(25 11) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
  <h1 class="title">
    Онлайн-матч (судья)
  </h1>
  <div v-loading="loading">
    <el-row class="game_info">
      <el-col
        :span="8"
      >
        <img
          :src="game.team_1?.school?.avatar?.url??'../../src/assets/images/team.png'"
          alt=""
          class="game_info_logo"
        >
        <h1 class="game_info_name">
          {{ game?.team_1?.name }}
        </h1>
      </el-col>
      <el-col
        :span="8"
        class="game_info_score"
      >
        <el-row>
          <el-col
            :span="24"
          >
            <h1>{{ game?.team_1_goals ?? 0 }}-{{ game?.team_2_goals ?? 0 }}</h1>
            <p class="game_info_score_status">
              {{ minutes }}:{{ seconds }}
            </p>
            <p class="game_info_score_status">
              {{ getPrintableGameStatus(game?.status) }}
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <img
          :src="game.team_2?.school?.avatar?.url??'../../src/assets/images/team.png'"
          alt=""
          class="logo"
        >
        <h1 class="game_info_name">
          {{ game?.team_2?.name }}
        </h1>
      </el-col>
    </el-row>
    <el-row class="game_details">
      <el-col :span="24">
        <p>
          {{ $moment(game.started_at).format('YYYY-MM-DD HH:mm') }} / {{ game.league?.name }} / {{
            game.division?.name
          }}
        </p>
      </el-col>
    </el-row>
    <el-row
      v-if="game.status!=='finished'"
      class="game_buttons"
    >
      <el-col
        :span="24"
        class="pb-4"
      >
        <el-popconfirm
          title="Изменить статус игры?"
          confirm-button-text="Да"
          cancel-button-text="Нет"
          @confirm="changeStatusClicked"
        >
          <template #reference>
            <el-button :type="game.status === 'not_started'?'success':'danger'">
              {{
                game.status === 'not_started' ? 'Начать матч' : game.status === 'started' ? 'Завершить матч' : 'Завершен'
              }}
            </el-button>
          </template>
        </el-popconfirm>
      </el-col>
      <el-col
        v-if="game.status==='started'"
        :span="24"
        class="game_buttons_pauses"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-popconfirm
              title="Приостановить игру?"
              confirm-button-text="Да"
              cancel-button-text="Нет"
              :disabled="isOnPause"
              @confirm="startPauseClicked"
            >
              <template #reference>
                <el-button
                  :disabled="isOnPause"
                  class="game_buttons_pauses_pause"
                >
                  Пауза
                </el-button>
              </template>
            </el-popconfirm>
          </el-col>
          <el-col :span="12">
            <el-popconfirm
              title="Продолжить игру?"
              confirm-button-text="Да"
              cancel-button-text="Нет"
              :disabled="!isOnPause"
              @confirm="finishPauseClicked"
            >
              <template #reference>
                <el-button
                  :disabled="!isOnPause"
                  class="game_buttons_pauses_continue"
                >
                  Продолжить игру
                </el-button>
              </template>
            </el-popconfirm>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="squad">
      <el-col
        :span="24"
        class="squad_title"
      >
        <h2>Составы команд</h2>
      </el-col>
      <el-col
        class="squad_body"
        :span="24"
      >
        <el-tabs
          v-model="activeTeamTab"
          type="card"
          stretch
        >
          <el-tab-pane
            :label="game.team_1?.name"
            name="first"
          >
            <el-row
              v-for="player in firstTeamsPlayers"
              :key="player.id"
              class="player"
            >
              <el-col
                :span="4"
                class="player_avatar"
              >
                <img
                  :src="player.player?.avatar?.url??'../../src/assets/images/avatar.png'"
                  alt=""
                >
              </el-col>
              <el-col
                :span="12"
                class="player_info"
              >
                <p>{{ player.player?.first_name ?? 'Автогол' }} {{ player.player?.last_name }}</p>
                <p
                  v-if="player.number"
                  class="player_info_number"
                >
                  №{{ player.number }} {{ player.position }}
                </p>
              </el-col>
              <el-col
                :span="8"
                class="player_actions"
              >
                <el-popconfirm
                  title="Добавить гол?"
                  class="cursor-pointer"
                  confirm-button-text="Да"
                  cancel-button-text="Нет"
                  @confirm="addGoal(player.id,player.team_id)"
                >
                  <template #reference>
                    <img
                      src="../../assets/images/ball.png"
                      alt=""
                    >
                  </template>
                </el-popconfirm>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            :label="game.team_2?.name"
            name="second"
          >
            <el-row
              v-for="player in secondTeamsPlayers"
              :key="player.id"
              class="player"
            >
              <el-col
                :span="4"
                class="player_avatar"
              >
                <img
                  :src="player.player?.avatar?.url??'../../src/assets/images/avatar.png'"
                  alt=""
                >
              </el-col>
              <el-col
                :span="12"
                class="player_info"
              >
                <p>{{ player.player?.first_name ?? 'Автогол' }} {{ player.player?.last_name }}</p>
                <p
                  v-if="player.number"
                  class="player_info_number"
                >
                  №{{ player.number }} {{ player.position }}
                </p>
              </el-col>
              <el-col
                :span="8"
                class="player_actions"
              >
                <el-popconfirm
                  title="Добавить гол?"
                  class="cursor-pointer"
                  confirm-button-text="Да"
                  cancel-button-text="Нет"
                  @confirm="addGoal(player.id,player.team_id)"
                >
                  <template #reference>
                    <img
                      src="../../assets/images/ball.png"
                      alt=""
                    >
                  </template>
                </el-popconfirm>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div>
      <el-row
        v-for="scorer in firstTeamsScorers"
        :key="scorer.id"
        class="goals player"
      >
        <el-col
          :span="4"
          class="player_avatar"
        >
          <img
            :src="scorer.player?.avatar?.url??'../../src/assets/images/avatar.png'"
            alt=""
          >
        </el-col>
        <el-col
          :span="12"
          class="player_info"
        >
          <p>{{ scorer.player?.first_name ?? 'Автогол' }} {{ scorer.player?.last_name }}</p>
          <p class="player_info_number">
            {{ scorer.number ? '№' + scorer.number : '' }} {{ game.team_1?.name }}
          </p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col
              v-for="(goal,index) in scorer.goals"
              :key="index"
              :span="12"
              class="goals_goal"
            >
              {{ goal }}`
              <el-popconfirm
                title="Удалить гол?"
                class="cursor-pointer"
                confirm-button-text="Да"
                cancel-button-text="Нет"
                @confirm="deleteGoal(scorer.id,goal)"
              >
                <template #reference>
                  <i>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.353553"
                        y1="0.646447"
                        x2="13.3536"
                        y2="13.6464"
                        stroke="#FF0000"
                      />
                      <line
                        x1="13.3536"
                        y1="1.35355"
                        x2="0.353553"
                        y2="14.3536"
                        stroke="#FF0000"
                      />
                    </svg>
                  </i>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        v-for="scorer in secondTeamsScorers"
        :key="scorer.id"
        class="goals player"
      >
        <el-col
          :span="4"
          class="player_avatar"
        >
          <img
            :src="scorer.player?.avatar?.url??'../../src/assets/images/avatar.png'"
            alt=""
          >
        </el-col>
        <el-col
          :span="12"
          class="player_info"
        >
          <p>{{ scorer.player?.first_name ?? 'Автогол' }} {{ scorer.player?.last_name }}</p>
          <p class="player_info_number">
            №{{ scorer.number }} {{ game.team_2?.name }}
          </p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col
              v-for="(goal,index) in scorer.goals"
              :key="index"
              :span="12"
              class="goals_goal"
            >
              {{ goal }}`
              <el-popconfirm
                title="Удалить гол?"
                class="cursor-pointer"
                confirm-button-text="Да"
                cancel-button-text="Нет"
                @confirm="deleteGoal(scorer.id,goal)"
              >
                <template #reference>
                  <i>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.353553"
                        y1="0.646447"
                        x2="13.3536"
                        y2="13.6464"
                        stroke="#FF0000"
                      />
                      <line
                        x1="13.3536"
                        y1="1.35355"
                        x2="0.353553"
                        y2="14.3536"
                        stroke="#FF0000"
                      />
                    </svg>
                  </i>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {
  getGame,
  getPrintableGameStatus,
  getPrintableGameStatuses,
  deleteGoalJury,
  addGoalJury,
  changeStatus,
  startPause,
  finishPause
} from '@/services/games/gameService.js'
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import moment from 'moment'

export default {
  name: "Game",
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(true)
    const route = useRoute()
    const gameId = computed(() => route.params.id)
    const game = ref([])
    let clockInterval
    const isOnPause = ref(false)
    const pause = ref([false])
    let time = ref(0)
    let pauses = ref(0)
    let minutes = ref(0)
    let seconds = ref(0)
    const activeTeamTab = ref('first')
    let secondTeamsPlayers = ref({})
    let firstTeamsPlayers = ref({})
    let firstTeamsScorers = ref({})
    let secondTeamsScorers = ref({})

    const getGameData = async () => {
      time.value = 0
      pauses.value = 0
      const {data} = await getGame(gameId.value)
      game.value = data
      firstTeamsPlayers.value = data.team_1_players.sort((a, b) => (a.number) - (b.number))
      secondTeamsPlayers.value = data.team_2_players.sort((a, b) => (a.number) - (b.number))
      firstTeamsScorers.value = firstTeamsPlayers.value.filter(player => player.goals?.length > 0).sort((a, b) => (b.goals?.length) - (a.goals?.length))
      secondTeamsScorers.value = secondTeamsPlayers.value.filter(player => player.goals?.length > 0).sort((a, b) => (b.goals?.length) - (a.goals?.length))
      pause.value = game.value?.pauses?.filter(pause => !pause.finished_at)
      isOnPause.value = !!pause.value.length

      if (game.value.status !== 'not_started') {
        if (game.value.pauses?.length) {
          game.value.pauses.forEach(pause => pauses.value += moment.duration(moment(pause.finished_at).diff(moment(pause.started_at)))._milliseconds)
        }

        let lastActiveDate = pause.value[0]?.started_at ?? new Date()
        time.value = moment.duration(moment(lastActiveDate).diff(moment(game.value.actual_start_time)))._milliseconds - pauses.value
        minutes.value = Math.floor(moment.duration(time.value).asMinutes())
        seconds.value = moment.duration(time.value).seconds()
      }

    }


    onMounted(async () => {
      try {
        setLoading()
        await getGameData()
        if (game.value.status === "started") {
          clockInterval = setInterval(() => {
            if (!isOnPause.value) {
              time.value += 100
              minutes.value = Math.floor(moment.duration(time.value).asMinutes())
              seconds.value = moment.duration(time.value).seconds()
            }
          }, 100)
        }
      } finally {
        setLoaded()
      }
    })

    const addGoal = async (gamePlayerId) => {
      try {
        setLoading()
        await addGoalJury(game.value.id, {game_player_id: gamePlayerId})
        await getGameData()
      } finally {
        setLoaded()
      }
    }

    const deleteGoal = async (gamePlayerId, goalMinute) => {
      try {
        setLoading()
        await deleteGoalJury(game.value.id, {game_player_id: gamePlayerId, minute: goalMinute})
        await getGameData()
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const changeStatusClicked = async () => {
      try {
        setLoading()
        let start = game.value.status === 'not_started'
        let finish = game.value.status === 'started'
        await changeStatus(game.value.id, {start: start, finish: finish})
        await getGameData()
        if (finish) {
          clearInterval(clockInterval);
        }
        if (start) {
          clockInterval = setInterval(() => {
            if (!isOnPause.value) {
              time.value += 100
              minutes.value = Math.floor(moment.duration(time.value).asMinutes())
              seconds.value = moment.duration(time.value).seconds()
            }
          }, 100)
        }
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const startPauseClicked = async () => {
      try {
        setLoading()
        await startPause(game.value.id)
        await getGameData()
      } finally {
        setLoaded()
      }
    }

    const finishPauseClicked = async () => {
      try {
        setLoading()
        await finishPause(game.value.id)
        await getGameData()
      } finally {
        setLoaded()
      }
    }

    return {
      loading,
      game,
      getPrintableGameStatus,
      getPrintableGameStatuses,
      activeTeamTab,
      firstTeamsPlayers,
      secondTeamsPlayers,
      firstTeamsScorers,
      secondTeamsScorers,
      isOnPause,
      seconds,
      minutes,
      addGoal,
      deleteGoal,
      changeStatusClicked,
      startPauseClicked,
      finishPauseClicked
    }
  },
}
</script>

<style scoped lang="scss">
.back_arrow {
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
}

.cursor-pointer {
  cursor: pointer;
}

.title {
  line-height: 24px;
  margin-bottom: 25px;
}

.search_info {
  color: #444444;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
}

.game_info {
  img {
    width: 60px;
    min-height: 60px;
    max-height: 80px;
  }

  & > div {
    text-align: center;
  }

  &_score {
    font-style: normal;
    font-weight: 800;
    font-size: 22px;
    line-height: 27px;
    text-align: center;
    letter-spacing: -0.24px;
    align-self: center;

    &_status {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      letter-spacing: -0.24px;
      color: #8A8A8A;
    }
  }

  &_name {
    margin-top: 15px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    letter-spacing: -0.24px;
    color: #000000;
  }
}

.game_details {
  margin-top: 20px;
  margin-bottom: 50px;

  p {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: #8A8A8A;
  }
}

.game_buttons {
  text-align: center;
  margin-bottom: 50px;

  &_pauses {
    &_pause {
      background: yellow;
      color: #8A8A8A !important;

      &.is-disabled {
        background: lighten(grey, 30)
      }

      &:hover:not(.is-disabled) {
        background: darken(yellow, 5);
      }
    }

    &_continue {
      background: #099348;

      &.is-disabled {
        background: lighten(grey, 30)
      }

      &:hover:not(.is-disabled) {
        background: darken(#099348, 5);
      }
    }
  }

  button {
    width: 100%;
    color: #FFFFFF;
  }
}

.squad {
  margin-bottom: 30px;

  &_title {
    margin-bottom: 20px;
  }

  &_body {
    background: #FFFFFF;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    .player {
      background: #DEE4E1;
    }
  }
}

.player {
  margin-bottom: 10px;
  padding: 15px;

  &_avatar {
    img {
      width: 30px;
      height: 30px;
    }
  }

  &_info {
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.24px;
    color: #000000;

    p {
      margin: 0;
    }

    &_number {
      font-weight: normal;
    }
  }

  &_actions {
    text-align: end;
  }
}

.goals {
  padding: 5px 15px;
  align-items: center;

  &_goal {
    margin-bottom: 5px;

    svg {
      margin-left: 5px;
    }
  }
}
</style>
