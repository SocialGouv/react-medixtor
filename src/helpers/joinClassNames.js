import E from "../errors";

export default function joinClassNames(classNames) {
  if (!Array.isArray(classNames)) throw E.error.HPR_01_PRM_CLN_NOT_ARR;

  return classNames.map(className => className.trim()).join(" ");
}
