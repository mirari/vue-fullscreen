# Examples

Compare the component, directive and API using the same content. Page-only mode is selected by default. Clear that checkbox to request native fullscreen.

## Component

The component binds fullscreen state with `v-model`.

<ClientOnly><FullscreenDemo /></ClientOnly>

[Component usage](/en/guide/component)

## Directive

Clicking the button toggles the target selected by its CSS selector. A callback updates the displayed state.

<ClientOnly><FullscreenDemo kind="directive" /></ClientOnly>

[Directive usage](/en/guide/directive)

## API

The API receives a DOM element and returns a Promise for the operation.

<ClientOnly><FullscreenDemo kind="api" /></ClientOnly>

[API usage](/en/guide/api)

## Fullscreen with body-mounted popups

The popup is a regular element mounted under `body`, as used by many dropdown and dialog libraries.

1. Keep page-only mode selected and turn off `teleport`. Enter fullscreen: the transformed parent limits the panel's fixed positioning.
2. Exit, enable `teleport`, and enter again. The panel now moves outside that parent and fills the viewport.
3. Exit, disable page-only mode and `teleport`, then enter native fullscreen. Toggle the body popup: it exists outside the fullscreen element, so the browser does not display it. A larger `z-index` cannot fix this.
4. Exit, enable `teleport`, and repeat. The library requests fullscreen on `body`; both the panel and the popup are inside it. The popup is now visible.

The panel uses `z-index: 1000` and the popup uses `1001`. These values are example styles, not library defaults. On browsers without native fullscreen support, the example falls back to page-only mode; step 3 will not reproduce native fullscreen isolation.

<ClientOnly><TeleportDemo /></ClientOnly>

The `teleport` option moves the fullscreen target; it does not automatically move your popups. Configure your UI library to append its popup to `body`. Alternatively, leave `teleport` disabled and mount the popup inside the fullscreen target.

## Keep fullscreen while changing views

Keep the fullscreen container outside the view that changes. This applies to tabs as well as Vue Router: place `<router-view>` inside the stable container.

```vue
<fullscreen v-model="active" teleport :exit-on-click-wrapper="false">
  <nav>
    <router-link to="/chart">Chart</router-link>
    <router-link to="/table">Table</router-link>
  </nav>
  <router-view />
  <button @click="active = false">Exit fullscreen</button>
</fullscreen>
```

This fragment belongs in the persistent application layout after registering the fullscreen plugin and configuring your routes. SPA navigation replaces the inner view; the fullscreen container must remain mounted. Putting a separate fullscreen component inside each route destroys it on navigation and exits fullscreen. Loading another document or reloading the page cannot preserve fullscreen.
