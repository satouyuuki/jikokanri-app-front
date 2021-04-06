export class Cookie {
  private _token: string = '';
  readonly _key = 'jikankanri';

  constructor() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(this._key));
    if (cookieValue !== undefined) {
      this._token = cookieValue.split('=')[1];
    } else {
      this._token = '';
    }
  }
  set token(token: string) {
    document.cookie = `${this._key}=${token}`;
    this._token = token;
  }
  get token() {
    return this._token;
  }
  // ログイン状態の算出
  get isLoggedIn(): boolean {
    return this._token ? true : false;
  };
}
