![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/artmizu/nuxt-yandex-metrika/release.yml?branch=main)

# 🕵️ [Yandex Metrika](https://metrica.yandex.com/) integration for Nuxt 3-4

## Features

- Support Nuxt 4 and Nuxt 3, nuxt 2 users can use [this one](https://github.com/artmizu/yandex-metrika-nuxt-2)
- Prints handy mesages in a dev mode, when certain goals is reached
- Expose useful methods to the nuxt app instance
- Runtime enable/disable control for analytics dispatch
- Fully customizable via runtime config
- Types for external API

## Installation

Install package via a package manager:

```bash
# using npm
npm install @artmizu/yandex-metrika-nuxt

# using yarm
yarn add @artmizu/yandex-metrika-nuxt

# using pnpm
pnpm add @artmizu/yandex-metrika-nuxt
```

Add it to a modules section of your nuxt config:

```js
export default {
  modules: ['@artmizu/yandex-metrika-nuxt'],
}
```

## Options

You can pass it through runtime config, module options and the special nuxt
config property `yandexMetrika`.

### id

- Type: `string`
- Required
- Description: Yandex metrika ID

Other parameters you can see in the type file [here](src/runtime/type.ts)

### enabled

- Type: `boolean`
- Default: `true`
- Description: Enables or disables script/plugin injection. Set it to `false` to disable Yandex Metrika completely.

```js
export default defineNuxtConfig({
  yandexMetrika: {
    id: '12345678',
    enabled: process.env.APP_ENV === 'production',
  },
})
```

## Runtime Control

Use `useYandexMetrika()` to stop or resume analytics dispatch after the module has been initialized.

```vue
<script setup>
const { enable, disable, setEnabled, enabled } = useYandexMetrika()

disable()
setEnabled(true)
</script>
```

## Runtime Config

Alternatively, leveraging [automatically replaced public runtime config values](https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig) by matching environment variables at runtime, set your desired option in your project's `.env` file:

```bash
# Sets the `yandexMetrika.id` module option
NUXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```
