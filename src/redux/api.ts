import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";

export function* callApi(endpoint: string, data?: object, method: string = "GET", headers: object = {}): SagaIterator {
  try {
    if (!(data instanceof FormData)) {
      Object.assign(headers, { "Content-Type": "application/vnd.github.v3+json" });
    }

    const request = {
      headers: { ...headers },
      method,
    };

    if (data) {
      Object.assign(request, {
        body: data instanceof FormData ? data : JSON.stringify(data),
      });
    }

    const responsePromise = yield call(fetch, endpoint, request);

    const responseData = yield responsePromise.json();

    if (responsePromise.status >= 400) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    throw error;
  }
}
