<script lang="ts" setup>
import { useNuxtApp } from '#app'

const ctx = useNuxtApp()
if (process.client)
  ctx.$metrika.reachGoal('zzz')
</script>

<template>
  <div>
    index page
  </div>
</template>
