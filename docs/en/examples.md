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
