export default defineNuxtConfig({
  compatibilityDate: '2026-10-09',
  ssr: true,
  devtools: { enabled: false },
  telemetry: false,
  nitro: {
    // Nuxt 4.6.0 leaves its renderer external on Windows: nuxt/nuxt#36467.
    externals: { inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/] },
  },
})
