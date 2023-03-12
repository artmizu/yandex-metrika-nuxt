![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/artmizu/nuxt-yandex-metrika/release.yml?branch=main)

# 🕵️ [Yandex Metrika](https://metrica.yandex.com/) integration for Nuxt 3

## Features

- Support Nuxt 3, nuxt 2 users can use
  [this one](https://github.com/artmizu/yandex-metrika-nuxt-2)
- Prints handy mesages in a dev mode, when certain goals is reached
- Expose useful methods to the nuxt app instance
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
