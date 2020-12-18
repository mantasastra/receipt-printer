import { round, roundUpToFiveCents } from "../round";

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

describe("roundUpToFiveCents", () => {
  it.each`
    input        | expectedOutput
    ${1.1301}    | ${1.15}
    ${0.5625}    | ${0.6}
    ${11.8125}   | ${11.85}
    ${0.01}      | ${0.05}
    ${99.5842}   | ${99.6}
    ${12.594123} | ${12.6}
    ${0.4723}    | ${0.5}
  `(
    "should round $input to $expectedOutput up to the nearest five cents",
    ({ input, expectedOutput }) => {
      expect(roundUpToFiveCents(input)).toBe(expectedOutput);
    }
  );
});
