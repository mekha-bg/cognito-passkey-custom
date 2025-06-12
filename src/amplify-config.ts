import { Amplify } from 'aws-amplify';
import type { AuthConfig } from '@aws-amplify/core';

Amplify.configure({
  Auth: {
    Cognito: { 
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      authenticationFlowType: 'USER_AUTH',
     webAuthn: {
        RPId: 'xxxxx',
        WebauthnDomain: 'xxxx',
        WebauthnOrigin: 'xxxxx'
}}
  } as AuthConfig
});
