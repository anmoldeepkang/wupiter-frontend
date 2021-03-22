export class Identity {
  public tokenType?: string;
  public idToken?: string;
  public accessToken?: string;

  public oid?: string;
  public email?: string;
  public name?: string;

  constructor(response?: any) {
    if (response) {
      this.tokenType = response.tokenType;
      this.idToken = response.idToken;
      this.accessToken = response.accessToken;

      this.oid = response.idTokenClaims.oid;
      this.email = response.idTokenClaims.email;
      this.name = response.idTokenClaims.name;
    }
  }
}
