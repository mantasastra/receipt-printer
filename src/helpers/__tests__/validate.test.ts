import { validate } from "../validate";

describe("validate", () => {
  it.each`
    input                                      | expectedOutput
    ${"1 imported bottle of perfume at 27.99"} | ${true}
    ${"1 bottle of perfume at 18.99"}          | ${true}
    ${"1 packet of headache pills at 9.75"}    | ${true}
    ${"3 box of imported chocolates at 11.25"} | ${true}
    ${""}                                      | ${false}
    ${"something"}                             | ${false}
    ${"box of imported chocolates"}            | ${false}
    ${"12"}                                    | ${false}
    ${"11.25"}                                 | ${false}
    ${"box of imported chocolates 11.25"}      | ${false}
    ${"packet of headache pills at 9.75"}      | ${false}
    ${"1 1 1"}                                 | ${false}
    ${"imported bottle of perfume at 27.99 1"} | ${false}
    ${"1 bottle of perfume at 18"}             | ${false}
  `(
    'should validate "$input" against the required format and return $expectedOutput',
    ({ input, expectedOutput }) => {
      expect(validate(input)).toBe(expectedOutput);
    }
  );
});
