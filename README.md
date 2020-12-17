# Cash Register

A cash register application that accepts lines of text
and returns receipts to the customer.

In the application, a cashier can input entries one by one.
Each input is validated against an accepted format.
Once the cashier has inserted all the products of the purchase,
upon a click of a button a receipt will be printed. 
The process can be repeated by clicking `start again` button.

## Live Website
The application is hosted on Netlify and can be accessed through this link: 
[Live App](https://mantas-cash-register.netlify.app)

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
    yarn test --coverage 
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
    
    