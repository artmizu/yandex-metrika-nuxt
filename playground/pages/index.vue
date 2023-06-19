<script lang="ts" setup>
import type { VisitorParams } from '../../src/runtime/global'
import { useNuxtApp } from '#app'
import { ref } from '#imports'

const user = ref<VisitorParams>({} as VisitorParams)
const ctx = useNuxtApp()
if (process.client)
  ctx.$metrika.reachGoal('zzz')
const sendUserParams = () => {
  ctx.$metrika.hit('user', { params: { currency: 'RUB' }, title: 'user' })
  ctx.$metrika.userParams(user.value)
}
</script>

<template>
  <div>
    index page
    <div style="width: 200px;">
      <form style="display: flex; flex-direction: column; gap: 10px;" @submit.prevent="sendUserParams">
        <input v-model="user.name" name="name">
        <input v-model="user.surname" name="surname">
        <button type="submit">
          Send user params
        </button>
      </form>
    </div>
  </div>
</template>
