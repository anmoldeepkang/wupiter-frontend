import {
  Configuration,
  InteractionRequiredAuthError,
  PublicClientApplication,
  SilentRequest
} from "@azure/msal-browser";

import {Identity} from "./Identity";
import {InteractiveSignInRequired} from "./InteractiveSignInRequired";
import {getAxiosInstance} from "../axios";
import {UserAgentApplication} from "msal";
export class AuthService {
  msalConfig: any;
  msalClient: UserAgentApplication;
  signInOptions: any;

  constructor() {
    this.signInOptions = {
      forceRefresh: false,
      scopes: ["openid", 'https://wupiter.onmicrosoft.com/a3422118-ff50-4b20-910a-50e5114135fa/demo.read']
    };

    this.msalConfig = {
      auth: {
        clientId: '959fcaaa-6a51-4e66-a643-b962f2405067',
        authority: 'https://wupiter.b2clogin.com/wupiter.onmicrosoft.com/B2C_1_signupsignin1',
        redirectUri: 'https://wupiter.azurewebsites.net/',
        postLogoutRedirectUri: 'https://wupiter.azurewebsites.net/',
        navigateToLoginRequestUrl: true,
        validateAuthority:false
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
      }
    };

    this.msalClient = new UserAgentApplication(this.msalConfig);
  }

  async signIn() {
    var response;
    try {
       response = await this.msalClient.loginPopup(this.signInOptions);
    } catch(error) {
      console.error(error);
    }
    return new Identity(response);
  }

  async signOut() {
    await this.msalClient.logout();
  }

  async getIdentity() {
     if (this.msalClient.getAccount()) {
       try {
         const response = await this.msalClient.acquireTokenSilent(this.signInOptions);
         return new Identity(response);
       } catch (error) {
         if (error instanceof InteractionRequiredAuthError) {
           const identity=await this.signIn();
           return identity;
         }
         throw error;
       }
     }
     return new Identity();
   }

}

const authService = new AuthService();

export default authService;
