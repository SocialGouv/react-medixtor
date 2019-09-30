/// <reference types="react" />

import React from "react";

export type OnChangeOutput = {
  html: string;
  jsx: React.ReactElement;
  source: string;
  rawSource: string;
};

export type MeditorProps = Partial<{
  className: string;
  defaultValue: string;
  disabled: boolean;
  editorClassName: string;
  editorStyle: object;
  headersOffset: number;
  noEditor: boolean;
  noPreview: boolean;
  noSpellCheck: boolean;
  onChange: (output: OnChangeOutput) => void;
  previewStyle: object;
  previewClassName: string;
  style: object;
}>;

declare class Meditor extends React.Component<MeditorProps> {}

export = Meditor;
