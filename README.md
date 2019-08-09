# Meditor

[![Travis CI Status][img-travis]][link-travis]

[MDX][link-mdx]-based Editor and Previewer for React.

> ⚠️ **This is a work in progress.**

## Features

- Editor-only, Previewer-only or both either horizontally or vertically.
- React component output (may be safely used to render the output natively
  within React).
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
npm i https://github.com/SocialGouv/meditor
```

```js
import React from "react";
import Meditor from "@SocialGouv/meditor";

export default class MyApp extends React.Component {
  onEdit(output) {
    console.log(output.source);
  }

  render() {
    return (
      <Meditor
        defaultValue="## Hi @SocialGouv!"
        onChange={this.onEdit.bind(this)}
      />
    );
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

```bash
yarn
yarn dev
```

---

[img-travis]:
  https://img.shields.io/travis/com/SocialGouv/meditor?style=flat-square
[link-mdx]: https://mdxjs.com
[link-travis]: https://travis-ci.com/SocialGouv/meditor
