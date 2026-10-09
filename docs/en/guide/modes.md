# Fullscreen modes

The component, directive and API all accept `pageOnly` and `teleport` options.

## Control interfaces

| Interface | Control                   | Typical use                            |
| --------- | ------------------------- | -------------------------------------- |
| Component | `v-model`                 | A chart, image or player container     |
| Directive | Click handler             | An existing toolbar button             |
| API       | Promise-returning methods | A function that controls a DOM element |

Each component owns a controller. Directives share the public `api` singleton. Avoid competing native fullscreen requests for different targets.

## Native and page-only fullscreen

|                 | Native                                  | Page-only                       |
| --------------- | --------------------------------------- | ------------------------------- |
| Setting         | `pageOnly: false` (default)             | `pageOnly: true`                |
| Area            | Browser-provided fullscreen area        | Current page viewport           |
| Browser toolbar | Hidden by the browser                   | Remains visible                 |
| User gesture    | Required                                | Not required                    |
| Exit            | Browser Esc, an exit button or `exit()` | Esc, an exit button or `exit()` |

When the browser does not support native fullscreen, the library falls back to page-only mode. If the API exists but the browser rejects a request, the operation reports an error and restores the DOM instead of silently changing modes.

## Teleport

With `teleport: true`, the target moves to `document.body` while active and returns to its original location on exit. In native mode, the fullscreen request targets the body so overlays mounted there can be displayed too.

- `false`: keep the target under its existing parent.
- `true`: move it to the body, for example to avoid clipping by a parent container.
- A target that is already the body is not moved.

Moving an element can affect inherited styles and ancestor selectors such as `.dashboard .panel`. Apply fullscreen background, scrolling and stacking styles directly to the target's class. The library does not set a background, `z-index` or overflow policy.

```css
.my-fullscreen {
  background: white;
  overflow: auto;
  z-index: 1000;
}
```

Use the [examples](/en/examples) to compare the options.
