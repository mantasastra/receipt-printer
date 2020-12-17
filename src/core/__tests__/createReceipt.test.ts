import { createReceipt } from "../createReceipt";

describe("createReceipt", () => {
  it("should create a receipt from provided products", () => {
    const mockProducts = [
      {
        product: "__PRODUCT__",
        quantity: 1,
        isImported: false,
        price: 12.99,
        taxApplied: 1.3,
        taxedPrice: 14.29,
      },
      {
        product: "__PRODUCT_TWO__",
        quantity: 3,
        isImported: true,
        price: 4.32,
        taxApplied: 1.94,
        taxedPrice: 14.9,
      },
    ];
    const expectedResult = [
      "1 __PRODUCT__: 14.29",
      "3 imported __PRODUCT_TWO__: 14.90",
      "Sales Taxes: 3.24",
      "Total: 29.19",
    ];

    const result = createReceipt(mockProducts);
    expect(result).toStrictEqual(expectedResult);
  });
});
