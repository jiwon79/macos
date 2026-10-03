# macOS Web React

A browser desktop built with React, TypeScript, Vanilla Extract, Zustand, and Motion. Includes draggable and resizable windows, Dock minimize/restore animations, menus, and a working calculator.

## Development

Use Node.js 22.22.2 (`nvm use`) and Yarn 1.22.22. The supported Node ranges are recorded in `package.json`; newer Node 24 installations need version 24.15.0 or later for jsdom.

```sh
nvm use
corepack enable
yarn install --frozen-lockfile
yarn dev
```

## Checks

```sh
yarn lint
yarn typecheck
yarn test:run
yarn build
yarn preview
```

`yarn test` starts Vitest in watch mode. `yarn build` checks the application and Vite configuration types before creating `dist/`.

## Desktop images

Wallpapers and Dock icons use imported asset URLs, so Vite resolves their production filenames and deployment base path. The desktop waits for both wallpaper themes and all three Dock icons. Failed or stalled requests show **Try again** and **Continue**, allowing access even when an image is unavailable. Both themes have a solid background fallback.

## Dependency updates

Build and test tools use Vite 8, Vitest 5, Biome 2, and jsdom 30. Runtime libraries include Zustand 5 and Motion 14. React remains on 18.3 and TypeScript on 5.9 to keep their existing application and compiler contracts; their next major migrations are separate work.

Update `package.json` and `yarn.lock` together, then run the checks above and verify both themes, menus, calculator input, window dragging/resizing, and Dock minimize/restore in the browser. Run `yarn audit` to check the resolved dependency tree.
