import { json, status } from "./Utilities"
import { BaseAPI } from "./BaseAPI"
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

export class AuthAPI extends BaseAPI {
  static path = super.path + "/auth";
  static access_token = null;
  static refresh_token = null;
  static remember = false;

  static async restoreSession() {
    if (Cookies.get('refresh_token')) {
      this.remember = true;
      this.refresh_token = Cookies.get('refresh_token');
      return this.refresh()
        .catch(() => {
          return Promise.reject(new Error("Session restore failed"))
        })
    } else {
      return Promise.reject(new Error("No previous session"))
    }
  }

  static async signin(username, password, remember) {
    return fetch(
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
      .then(({ access_token, refresh_token }) => {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.setRefreshTimeout()
        if (remember) {
          this.remember = true;
          Cookies.set('refresh_token', this.refresh_token);
        }
      })
      .catch((response) => { return Promise.reject(response) })
  }

  static signout() {
    this.access_token = null;
    this.refresh_token = null;
    Cookies.set('refresh_token');
  }

  static setRefreshTimeout() {
    const tokenDecoded = jwt_decode(this.access_token);
    const timeoutMs = new Date(tokenDecoded.exp * 1000) - new Date() - 30000; //Expire time - 30 sec
    setTimeout(() => this.refresh(), timeoutMs);
  }

  static async refresh() {
    let { access_token, refresh_token } = await fetch(
      this.path + "/token-refresh?" + new URLSearchParams({ refresh_token: this.refresh_token }),
      { method: 'POST' }
    )
      .then(status)
      .then(json)
      .catch(() => {
        console.log("Token refresh failed");
        return Promise.reject(new Error("Token refresh failed"));
      })

    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.setRefreshTimeout();
    if (this.remember) {
      Cookies.set('refresh_token', this.refresh_token);
    }
    return Promise.resolve(true)
  }
}