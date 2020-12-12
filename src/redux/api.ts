import { SagaIterator } from "redux-saga";
import { call, select, put } from "redux-saga/effects";

export function* callApi(endpoint: string, data?: object, method: string = "GET", headers: object = {}): SagaIterator {
  try {

    if (!(data instanceof FormData)) {
      Object.assign(headers, { "Content-Type": "application/json" });
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

    return responseData.payload.data;
  } catch (error) {
    throw error;
  }
}
