import { testHook } from "react-hooks-testing-library";
import reducer from "./application";

test("reducer returns an error with an unsupported type", () => {
  expect(() => reducer({}, {type:null})).toThrowError(
    /tried to reduce with unsupported action type/i
  );
});