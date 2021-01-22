/* eslint-disable no-param-reassign */
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
    });
  }
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: (resource) => {
    const url = `${apiUrl}/${resource}`;

    return httpClient(url).then(({ /* headers, */ json }) => ({
      data: json,
      total: json.length,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: async (resource, params) => {
    await params.ids.map((id) => {
      return httpClient(`${apiUrl}/${resource}/${id}`);
    });
    return ({ json }) => ({
      data: json,
    });
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  // create: (resource, params) =>
  //   httpClient(`${apiUrl}/${resource}`, {
  //     method: 'POST',
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({
  //     data: { ...params.data, id: json.id },
  //   })),

  create: (resource, params) => {
    if (resource !== 'sponsors') {
      return httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    }

    const formData = new FormData();

    formData.append('name', params.data.name);
    formData.append('image', params.data.image.rawFile);

    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: formData,
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },

  delete: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then((res) => ({ data: res.status }));
  },

  deleteMany: async (resource, params) => {
    await params.ids.map((id) => {
      return httpClient(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      });
    });
    return { data: ['datas deleted'] };
  },
};
