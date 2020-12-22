[![Build Status](https://travis-ci.com/mantasastra/receipt-printer.svg?branch=main)](https://travis-ci.com/mantasastra/receipt-printer)
[![codecov](https://codecov.io/gh/mantasastra/receipt-printer/branch/main/graph/badge.svg?token=E2CTLWHQJI)](https://codecov.io/gh/mantasastra/receipt-printer)

# Receipt Printer

A receipt printer application that accepts lines of text
and returns receipts to the customer.

In the application, an user can input entries one by one.
Each input is validated against an accepted format.
Once the user has inserted all of the products of the purchase,
upon a click of a button a receipt will be printed.
The process can be repeated by clicking `start again` button.

## Live Website

The application is hosted on Netlify and can be accessed through this link:
[Live App](https://receipt-printer.netlify.app)

## Demo

![Demo](https://i.imgur.com/18b7Weu.gif)

## Example of Input/Output

Input

```text
1 box of chocolate at 12.99
1 bottle of cider at 3.99
2 bars of candies at 2.99
4 imported cakes at 1.99
```

Output

```text
1 BOX OF CHOCOLATE: 12.99
1 BOTTLE OF CIDER: 3.99
2 BARS OF CANDIES: 6.88
4 IMPORTED CAKES: 9.56

SALES TAXES: 2.50
TOTAL: 33.42
```

## Tax System Used

- Base Tax rate is 15%
- Import Tax rate is 5%
- Products excluded from base tax are: `book`, `chocolate`, `pills` and `bottle`

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

`yarn` or `npm`

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mantasastra/cash-register-circuit.git
   ```
2. Install all the required packages
   ```sh
    yarn install
   ```

### Available Commands

1. To start the application on port `3000`

   ```sh
   yarn start
   ```

2. To run the tests

   ```sh
   yarn test
   ```

3. To run tests with coverage
   ```sh
   yarn test-coverage
   ```

## File Structure

Project is split into multiple directories for better access and easier usage.

    .
    ├── src                     # Source files
        ├── components          # Reusable components specific for the application
        ├── core                # Core logic of the application (calculations)
        ├── data                # (Tax) Data that is used in the logic calculations
        ├── helpers             # Useful helpers that are used across the application
        ├── pages               # Main components of the application
