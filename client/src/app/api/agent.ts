import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:6001/api/";

const respondeBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(respondeBody),
  post: (url: string, body: {}) => axios.post(url, body).then(respondeBody),
  put: (url: string, body: {}) => axios.put(url, body).then(respondeBody),
  delete: (url: string) => axios.delete(url).then(respondeBody),
};

const Catalog = {
  list: () => requests.get("/products"),
  details: (id: number) => requests.get(`/products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get404Error: () => requests.get("buggy/not-found"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
