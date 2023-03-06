![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/nuxt-yandex-metrika/CI?label=CI&style=plastic)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/nuxt-yandex-metrika/release-please?label=release&style=plastic)

# Yandex Metrika integration for Nuxt 3

## Features

- Support Nuxt 3, for the nuxt 2 users check
  [this one](https://github.com/artmizu/yandex-metrika-nuxt-2)
- Prints handy mesages in a dev mode, when certain goals is reached
- Expose useful methods to the nuxt app instance
- Fully customizable via runtime config
- Types for external API

## Installation

Install package via a package manager:

```bash
# using npm
npm install --save-dev @artmizu/nuxt-yandex-metrika

# using yarm
yarn add -D @artmizu/nuxt-yandex-metrika

# using pnpm
pnpm add -D @artmizu/nuxt-yandex-metrika
```

Add it to a modules section of your nuxt config:

```js
export default {
  modules: ['@artmizu/nuxt-yandex-metrika'],
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
