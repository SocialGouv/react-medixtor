# react-medixtor

[![License][img-license]][link-license] [![NPM Version][img-npm]][link-npm]
[![Build Status][img-travis]][link-travis] [![Code Coverage][img-coveralls]][link-coveralls]

[MDX][link-mdx]-based Editor, Previewer and Renderer for React.

> ⚠️ **This is a work in progress.**

## Features

- Editor-only, Previewer-only or both either horizontally or vertically.
- React component output (may be safely used to render the output natively within React).
- Markdown output (not sanitized yet !).
- HTML output (not sanitized yet !).
- Browser spell-checking.
- Fully customizable styles.

## Planned Features

- MDX output.
- Per-block comments.
- Rich editor buttons.
- Sanitized HTML output.
- Sanitized Markdown output.

## Get Started

```bash
npm i react-medixtor
```

```js
import React from "react";
import Meditor from "@SocialGouv/meditor";

export default class MyApp extends React.Component {
  onEdit(output) {
    console.log(output.source);
  }

  render() {
    return <Meditor defaultValue="## Hi @SocialGouv!" onChange={this.onEdit.bind(this)} />;
  }
}
```

## Properties

```js
{
  className: String, // CSS classes. Default: "".
  defaultValue: String, // Initial Markdown source. Default: "".
  disabled: Boolean, // Disable editor. Default: false.
  editorStyle: Object, // Overwrite editor style.
  headersOffset: Number, // Headers offset for HTML & JSX outputs. Default: 1.
  onChange: Function, // Triggered after each editor change. Default: undefined.
  noEditor: Boolean, // Hide editor. Default: false.
  noPreview: Boolean, // Hide preview. Default: false.
  previewStyle: Object, // Overwrite preview style.
  noSpellCheck: Boolean, // Disable editor spell-check. Default: false.
  style: Object, // Overwrite container style.
}
```

### `onChange(output)`

```js
output: {
  html: String, // Non-sanitized HTML source (converted via Showdown).
  jsx: Function, // Integrable React component.
  source: String, // Normalized Markdown source.
  rawSource: String, // Raw Markdown source.
}
```

## Contribute

### Getting started

Just install the dependencies

```bash
yarn
```

### Development

This will watch your changes and live-reload the browser:

```bash
yarn dev
```

You can now open Meditor in [http://localhost:10001](http://localhost:10001).

_:memo: **Note:** You still need to manually refresh when changing `index.html` or `index.css`
files._

### Test

- All Tests: `yarn test`
- Lint Tests: `yarn test:lint`
- Unit Tests: `yarn test:unit`
- Unit Tests (watch): `yarn test:watch`

### Publish

```bash
npm version [major|minor|patch|preversion]
```

This will automatically build, tag and publish into Github.

### VSCode Settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveTimeout": 2000,
  "editor.formatOnPaste": true,
  "editor.rulers": [100]
}
```

## License

This package and its sources are distributed under [Apache 2.0][link-license].

---

[img-coveralls]:
  https://img.shields.io/coveralls/github/SocialGouv/react-medixtor/master?style=flat-square
[img-license]: https://img.shields.io/badge/License-MIT-blue?style=flat-square
[img-npm]: https://img.shields.io/npm/v/react-medixtor?style=flat-square
[img-travis]: https://img.shields.io/travis/com/SocialGouv/react-medixtor?style=flat-square
[link-coveralls]: https://coveralls.io/github/SocialGouv/react-medixtor
[link-license]: https://github.com/SocialGouv/react-medixtor/blob/master/LICENSE
[link-mdx]: https://mdxjs.com
[link-npm]: https://www.npmjs.com/package/react-medixtor
[link-travis]: https://travis-ci.com/SocialGouv/react-medixtor
