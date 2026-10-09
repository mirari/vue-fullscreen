---
layout: home
hero:
  name: vue-fullscreen
  text: Fullscreen for Vue
  tagline: Control native or page-only fullscreen using a component, directive or API.
  actions:
    - theme: brand
      text: Getting started
      link: /en/guide/getting-started
    - theme: alt
      text: Examples
      link: /en/examples
features:
  - title: Component
    details: Control fullscreen with v-model. The bound value updates when the user exits fullscreen.
    link: /en/guide/component
  - title: Directive
    details: Toggle fullscreen when a button is clicked, with a target element and optional settings.
    link: /en/guide/directive
  - title: API
    details: Control a DOM element with request, toggle and exit. Each operation returns a Promise.
    link: /en/guide/api
---

<div class="vp-doc" style="max-width: 960px; margin: 32px auto; padding: 0 24px;">

<ClientOnly><FullscreenDemo simple /></ClientOnly>

</div>
