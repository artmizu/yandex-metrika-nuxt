<script lang="ts" setup>
import { useNuxtApp } from '#app'
import { ref } from '#imports'
interface User {
  name: string
  surname: string
}
const user = ref<User>({} as User)
const ctx = useNuxtApp()
if (process.client)
  ctx.$metrika.reachGoal('zzz')
const sendUserParams = () => {
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
