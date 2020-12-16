import calculateTax from "../calculateTax";

describe("calculateTax", () => {
  const mockProducts = [
    {
      product: "__PRODUCT__",
      quantity: 1,
      isImported: false,
      price: 12.99,
    },
    {
      product: "__PRODUCT_TWO__",
      quantity: 3,
      isImported: true,
      price: 4.32,
    },
  ];

  const mockTaxData = {
    baseTaxRate: 0.1,
    importTaxRate: 0.05,
    exemptProductsFromBaseTax: [],
  };

  it("should apply tax correctly to given products", () => {
    const expectedResult = [
      {
        ...mockProducts[0],
        taxApplied: 1.3,
        taxedPrice: 14.29,
      },
      {
        ...mockProducts[1],
        taxApplied: 1.94,
        taxedPrice: 14.9,
      },
    ];

    const result = calculateTax(mockProducts, mockTaxData);

    expect(result).toStrictEqual(expectedResult);
  });

  it("should exempt product from base tax if the product is in the exempt list", () => {
    const mockTaxDataWithExempt = {
      ...mockTaxData,
      exemptProductsFromBaseTax: ["__PRODUCT__"],
    };
    const expectedResult = [
      {
        ...mockProducts[0],
        taxApplied: 0,
        taxedPrice: 12.99,
      },
      {
        ...mockProducts[1],
        taxApplied: 1.94,
        taxedPrice: 14.9,
      },
    ];

    expect(calculateTax(mockProducts, mockTaxDataWithExempt)).toStrictEqual(
      expectedResult
    );
  });
});
