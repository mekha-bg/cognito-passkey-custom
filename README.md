#cognito-passkey-custom

This is a TypeScript+React project that integrates AWS Cognito with passkey for passwordless authentication.

How cognito-passkey-custom works:
1. Users can sign in as a new user or use their existing credentials to log in.
2. A new user signs up using their email and password. This email ID will be verified with an OTP. The user can register a passkey already existing on their system in the next step. After successfully adding a passkey, the user will be directed to the Dashboard, where they will see a welcome message and a Logout button that returns them to the landing page.
3. An already existing user can log in using their password or passkey to be taken to the Dashboard.

Make sure to update amplify-config and env file with your config details.

To run the app, use: npm run dev
