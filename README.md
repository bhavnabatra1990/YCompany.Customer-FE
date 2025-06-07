# YCompanyCustomerFE

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.20.0.

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Install Dependencies
Navigate to the project directory and install the required dependencies:
```bash
cd YCompany.Customer-FE
npm install
```

### 2. Configure Environment
Update the `environment.ts` file with the appropriate values for Okta issuer and client ID:
```plaintext
export const environment = {
    production: false,
    oktaIssuer: '<your-okta-issuer>',
    oktaClientId: '<your-okta-client-id>'
};
```

### 3. Start the Development Server
Run the following command to start the local development server:
```bash
ng serve
```

### 4. Access the Application
Once the server is running, open your browser and navigate to:
```
http://localhost:4200/
```
The application will automatically reload whenever you modify any of the source files.

### 5. Additional Notes
- Ensure you have Node.js and Angular CLI installed on your system.
- For production builds, use `ng build --prod` to generate optimized output.

