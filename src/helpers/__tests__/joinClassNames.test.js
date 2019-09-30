import E from "../../errors";
import joinClassNames from "../joinClassNames";

describe("helpers/joinClassNames()", () => {
  test("should throw the expected error when <classNames> is not an array", () => {
    expect(() => joinClassNames()).toThrow(E.dictionary.HPR_01_PRM_CLN_NOT_ARR);
    expect(() => joinClassNames(123)).toThrow(E.dictionary.HPR_01_PRM_CLN_NOT_ARR);
    expect(() => joinClassNames("")).toThrow(E.dictionary.HPR_01_PRM_CLN_NOT_ARR);
    expect(() => joinClassNames({})).toThrow(E.dictionary.HPR_01_PRM_CLN_NOT_ARR);
  });

  test("should return the expected results", () => {
    expect(joinClassNames(["a"])).toStrictEqual("a");
    expect(joinClassNames(["a", "b"])).toStrictEqual("a b");
    expect(joinClassNames(["a", " b", " c"])).toStrictEqual("a b c");
  });
});
