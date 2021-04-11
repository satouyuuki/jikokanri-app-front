interface Authentication {
  access_token: string;
  email: string;
}
export class Cookie {
  private _value: string | null = '';
  readonly _key = 'jikankanri';

  constructor() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(this._key));
    if (cookieValue !== undefined) {
      const data = cookieValue.split('=')[1];
      this._value = data
    } else {
      this._value = '';
    }
  }
  set value(value: Authentication | null) {
    if (value === null) {
      document.cookie = `${this._key}=;`;
      this._value = null;
    } else {
      const encodeJsonData = JSON.stringify(value);
  
      document.cookie = `${this._key}=${encodeJsonData}`;
      this._value = encodeJsonData;
    }
  }
  get value() {
    if (this._value === null) {
      return null;
    }
    return JSON.parse(this._value || 'null');
  }
  // ログイン状態の算出
  get isLoggedIn(): boolean {
    return this.value !== null;
  };

  get email() {
    return this.value !== null
      ? this.value.email
      : '';
  }
  get token() {
    return this.value !== null
      ? this.value.access_token
      : '';
  }
}
