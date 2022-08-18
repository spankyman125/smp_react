import { json, status } from "./Utilities"
import { BaseAPI } from "./BaseAPI"
import Cookies from 'js-cookie'

export class AuthAPI extends BaseAPI {
  static path = super.path + "/auth";
  static access_token = null;
  static refresh_token = null;
  static remember = false;

  static async restore_session(
    successCallback = () => void 0,
    errorCallback = () => void 0,
  ) {
    if (Cookies.get('refresh_token')) {
      this.remember = true;
      this.refresh_token = Cookies.get('refresh_token');
      return this.refresh()
        .then(successCallback)
        .catch(() => {
          errorCallback()
          return Promise.reject(new Error("Session restore failed"))
        })
    } else {
      errorCallback();
      return Promise.resolve("No previous session")
    }
  }

  static async signin(
    username,
    password,
    remember,
    successCallback = () => void 0,
    errorCallback = () => void 0,
  ) {
    let { access_token, refresh_token } = await fetch(
      this.path + "/token",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: username,
          password: password
        })
      }
    )
      .then(status)
      .then(json)
      .catch(errorCallback)

    this.access_token = access_token;
    this.refresh_token = refresh_token;
    successCallback();

    if (remember) {
      this.remember = true;
      Cookies.set('refresh_token', this.refresh_token);
    }
  }

  static signout(callback = () => void 0) {
    this.access_token = null;
    this.refresh_token = null;
    Cookies.set('refresh_token');
    callback();
  }

  //TODO: Add token refresh by time?
  static async refresh(
    successCallback = () => void 0, 
    errorCallback = () => void 0,
  ) {
    let { access_token, refresh_token } = await fetch(
      this.path + "/token-refresh?" + new URLSearchParams({ refresh_token: this.refresh_token }),
      { method: 'POST' }
    )
      .then(status)
      .then(json)
      .catch(() => {
        console.log("Token refresh failed");
        errorCallback();
        return Promise.reject(new Error("Token refresh failed"));
      })

    this.access_token = access_token;
    this.refresh_token = refresh_token;

    successCallback();
    if (this.remember) {
      Cookies.set('refresh_token', this.refresh_token);
    }
    return Promise.resolve(true)
  }
}