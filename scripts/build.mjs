import { build } from 'vite'
import { execFileSync } from 'node:child_process'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

for (const line of ['vue2', 'vue3']) {
  const destination = resolve('dist', line)
  await rm(destination, { recursive: true, force: true })
  await build({
    configFile: false,
    build: {
      target: 'es2018',
      outDir: destination,
      lib: {
        entry: resolve(`packages/${line}/src/index.ts`),
        name: 'VueFullscreen',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) =>
          ({ es: 'index.js', cjs: 'index.cjs', umd: 'index.umd.js' })[format],
      },
      rolldownOptions: {
        external: ['vue'],
        output: { globals: { vue: 'Vue' }, exports: 'named' },
      },
    },
  })
  await rm(`.types/${line}`, { recursive: true, force: true })
  execFileSync(
    'node',
    ['node_modules/typescript/bin/tsc', '-p', `packages/${line}/tsconfig.json`],
    { stdio: 'inherit' },
  )
  await mkdir(`${destination}/types/${line}`, { recursive: true })
  await cp(`.types/${line}/${line}/src`, `${destination}/types/${line}/src`, {
    recursive: true,
  })
  await cp(`.types/${line}/core`, `${destination}/types/core`, {
    recursive: true,
  })
  // NodeNext needs explicit declaration extensions; CJS needs its own entry declaration.
  const entry = `types/${line}/src/index.d.ts`
  let declaration = await readFile(`${destination}/${entry}`, 'utf8')
  declaration = declaration.replaceAll(
    "'../../core/src/index'",
    "'../../core/src/index.js'",
  )
  await writeFile(`${destination}/${entry}`, declaration)
  await writeFile(
    `${destination}/${entry.replace('.d.ts', '.d.cts')}`,
    declaration,
  )
  const coreTypes = `${destination}/types/core/src/index.d.ts`
  await writeFile(
    coreTypes,
    (await readFile(coreTypes, 'utf8')).replaceAll(
      "'screenfull'",
      "'./screenfull.js'",
    ),
  )
  await cp(
    'node_modules/screenfull/index.d.ts',
    `${destination}/types/core/src/screenfull.d.ts`,
  )
  // Keep the browser-global bundle usable under type:module as a classic script.
  const { version } = JSON.parse(
    await readFile(`packages/${line}/package.json`, 'utf8'),
  )
  const metadata = {
    name: 'vue-fullscreen',
    version,
    description: 'A simple Vue.js component for fullscreen',
    type: 'module',
    main: './index.cjs',
    module: './index.js',
    types: `./${entry}`,
    unpkg: './index.umd.js',
    exports: {
      '.': {
        import: { types: `./${entry}`, default: './index.js' },
        require: {
          types: `./${entry.replace('.d.ts', '.d.cts')}`,
          default: './index.cjs',
        },
      },
      './package.json': './package.json',
    },
    files: ['*.js', '*.cjs', 'types', 'README.md', 'LICENSE'],
    sideEffects: false,
    peerDependencies: { vue: line === 'vue2' ? '^2.6.14 || ^2.7.0' : '^3.0.0' },
    license: 'MIT',
    author: 'mirari',
    keywords: ['vue', 'fullscreen'],
    repository: {
      type: 'git',
      url: 'git+https://github.com/mirari/vue-fullscreen.git',
    },
    bugs: { url: 'https://github.com/mirari/vue-fullscreen/issues' },
    homepage: 'https://github.com/mirari/vue-fullscreen#readme',
  }
  await mkdir(destination, { recursive: true })
  await writeFile(
    `${destination}/package.json`,
    JSON.stringify(metadata, null, 2) + '\n',
  )
  await cp('README.md', `${destination}/README.md`)
  await cp('LICENSE', `${destination}/LICENSE`)
  // screenfull is bundled, so ship its license too.
  await cp(
    'node_modules/screenfull/license',
    `${destination}/SCREENFULL-LICENSE`,
  )
  metadata.files.push('SCREENFULL-LICENSE')
  await writeFile(
    `${destination}/package.json`,
    JSON.stringify(metadata, null, 2) + '\n',
  )
}
