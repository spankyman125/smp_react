import { AuthAPI } from "./AuthAPI"

export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

export function json(response) {
  return response.json()
}

export function withAuth(request) {
  if (request) {
    return {
      ...request,
      headers: {
        ...request.headers,
        "Authorization": "Bearer " + AuthAPI.access_token
      }
    }
  } else {
    return {
      headers: {
        "Authorization": "Bearer " + AuthAPI.access_token
      }
    }
  }
}

// Race condition?
export function retryAfterRefresh(method) {
  return async (...args) =>
    method(...args)
      .catch(
        async () => {
          await AuthAPI.refresh();
          return method(...args);
        }
      )
}
