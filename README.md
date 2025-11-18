# LLMs Unplugged

Static site for llmsunplugged.org

## Tech stack

- **11ty** for static site generation
- **Vite** for asset bundling with the Tailwind Vite plugin
- **Vitest** for testing
- **Tailwind CSS v4** for styling (no PostCSS required)
- **ES6 modules** throughout

## Development

```bash
npm run dev
```

Starts the 11ty dev server with live reload at http://localhost:8080

## Build

```bash
npm run build
```

Builds assets with Vite, then generates the static site with 11ty. Output goes
to `_site/`

## Test

```bash
npm test
```

Runs integration tests that verify:

- build output exists (`_site/` directory)
- CSS and JS bundles are generated
- Tailwind CSS is properly processed
- HTML structure is valid
- key content is present

For watch mode during development:

```bash
npm run test:watch
```

## Project structure

```
src/
  _layouts/        # Nunjucks layout templates
  _includes/       # Reusable template partials
  assets/          # CSS and JS source files
  index.md         # Homepage content
```

## About LLMs Unplugged

LLMs Unplugged is a resource exploring large language models and AI through a
practical, hands-on lens.
