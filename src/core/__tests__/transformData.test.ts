import { transformData } from "../transformData";
import * as mockValidate from "../../helpers/validate";

describe("transformData", () => {
  it("should extract the required information from the data provided", () => {
    const mock = jest.spyOn(mockValidate, "validate");
    mock.mockReturnValueOnce(true);

    const mockData = "1 imported __PRODUCT__ at 12.99";
    const expectedResult = {
      product: "__PRODUCT__",
      quantity: 1,
      price: 12.99,
      isImported: true,
    };
    const result = transformData(mockData);

    expect(result).toStrictEqual(expectedResult);

    mock.mockRestore();
  });

  it("should throw an error when an incorrect data is provided", () => {
    const mock = jest.spyOn(mockValidate, "validate");
    mock.mockReturnValueOnce(false);

    const mockData = "__PRODUCT__ 12.99";
    const expectedError = new Error(
      'Please use this format: "QTY PRODUCT PRICE". (e.g. 1 box of chocolate at 9.99)'
    );

    expect(() => transformData(mockData)).toThrowError(expectedError);

    mock.mockRestore();
  });
});
