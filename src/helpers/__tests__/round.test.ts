import { round } from "../index";

describe("round", () => {
  it.each`
    input        | expectedOutput
    ${1.0}       | ${1.0}
    ${1.124}     | ${1.12}
    ${1.126}     | ${1.13}
    ${0.83594}   | ${0.84}
    ${0.9214}    | ${0.92}
    ${12.594123} | ${12.59}
    ${13.9999}   | ${14.0}
  `("should round $input to $expectedOutput", ({ input, expectedOutput }) => {
    expect(round(input)).toBe(expectedOutput);
  });
});
