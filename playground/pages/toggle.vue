<script lang="ts" setup>
import { useNuxtApp } from '#app'

const { enable, disable } = useYandexMetrika()
const { $metrika } = useNuxtApp()

function reachGoal() {
  $metrika.reachGoal('toggle-goal')
}
</script>

<template>
  <div>
    toggle page
    <button id="disable-metrika" type="button" @click="disable">
      Disable metrika
    </button>
    <button id="enable-metrika" type="button" @click="enable">
      Enable metrika
    </button>
    <button id="toggle-goal" type="button" @click="reachGoal">
      Reach goal
    </button>
  </div>
</template>
