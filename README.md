<div align="center">
  <h1>
    <p>Learning *Work in Progress*</p>
    <!-- make sure to update the links -->
    <a href="https://github.com/shivan-s/learning/actions/workflows/main.yml">
       <img src="https://github.com/shivan-s/learning/actions/workflows/main.yml/badge.svg" alt="Github status for App" />
    </a>
  </h1>

</div>

## Requirements

- node
- npm
- Patience & Creativity

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
cd client
npm install
npm run dev -- --open
```

`db/` contains information to initialise the database.

## Deploying

This project usses github actions to deploy onto Cloudflare with every code change.

1. Make sure secrets are set for the following variables:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_AUTHOR_ID`

[Instructions on how to obtain these are here](https://github.com/cloudflare/pages-action).

2. Make sure Github Actions permissions is set to Read and Write using a `GITHUB_TOKEN`.

_WIP_
