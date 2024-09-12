export default async function (_, _nuxt) {
  const { addPluginTemplate } = await import('@nuxt/kit')

  const nuxt = (this && this.nuxt) || _nuxt

  nuxt.options.css.push('@anny.co/floating-vue/dist/style.css')

  addPluginTemplate({
    filename: 'floating-vue.mjs',
    getContents: () => `
      import { defineNuxtPlugin } from '#imports'
      import FloatingVue from '@anny.co/floating-vue'
      
      export default defineNuxtPlugin((nuxtApp) => {
        // @TODO cutomization
        nuxtApp.vueApp.use(FloatingVue)
      })
    `,
  })

  // SSR support for v-tooltip directive
  nuxt.options.vue.compilerOptions.directiveTransforms = nuxt.options.vue.compilerOptions.directiveTransforms || {}
  nuxt.options.vue.compilerOptions.directiveTransforms.tooltip = () => ({
    props: [],
    needRuntime: true,
  })
}
