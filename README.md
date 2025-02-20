# lakeFS FS assignment

## Developing

Once you've installed dependencies with `npm install` (`bun i` or `pnpm install` or `yarn`), start a development server:

Create an .env file and add your GITHUB_ACCESS_TOKEN (will not build without it!)

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
