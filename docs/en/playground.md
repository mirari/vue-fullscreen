---
aside: false
pageClass: playground-page
---

# Playground

Edit the code and click **Run** to test `pageOnly`, `teleport` and popups in the preview. Native fullscreen **can only be triggered by** a user action such as a click, touch or key press.

<ClientOnly><FullscreenPlayground /></ClientOnly>

The image preview uses [v-viewer](https://github.com/mirari/v-viewer); install it separately with `npm install v-viewer`.

`pageOnly` fills the preview area. Supports JavaScript and CSS in a single `App.vue`, with `vue` and `vue-fullscreen` included.
