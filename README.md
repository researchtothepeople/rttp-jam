# RTTP Results Site

Front-end layout and dashboard UI for the cases and results site using [Gatsby](https://www.gatsbyjs.com/docs/) and [Sanity](https://www.sanity.io/docs).

## Setup

run `yarn` in both `cms` and `web` folders to install packages.

run `yarn start` in both `cms` and `web` folders to start the development server. You will need 2 terminal windows.

When installing Sanity plugins, use `sanity install` to automatically register the plugin.

## Publishing

This repository is configured to build automatically on Gatsby Cloud and hosted Sanity Studio.

A Sanity project ID is included in `rttp-jam-cms/sanity.json` and attached to the static site generator via a `.env` file. See `rttp-jam-web/env.example` for reference.
