import {useState} from "react";
import {url} from "@src/utils/config.js";


export const useAutoComplete = (target, def = []) => {
  const [data, setData] = useState(def);
  const [loading, setLoading] = useState(false);
  const get = word => {
    if (word === '') {
      setData([]);
      return;
    }

    setLoading(true);
    fetch(`${url.backend}/${target}/autocomplete?q=${word}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(e => {
        console.log('Error: ', e)
        setLoading(false);
      });
  };

  return {data, loading, get};
};


export const useCreate = (target) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const create = async (method, data, id = null) => {
    resetErrors()
    const body = formatBody(data)
    const requestUrl = `${url.backend}/${target}`

    setLoading(true)
    return Fetch(requestUrl, 'POST', body)
  }

  const update = async (method, data, id) => {
    resetErrors()
    const body = formatBody(data)
    const requestUrl = `${url.backend}/${target}/${id}`

    setLoading(true)
    return Fetch(requestUrl, 'PUT', body)
  }

  const Fetch = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }
    )
      .then(response => {
        if (response.status === 500)
          throw {errors: 'Erreur serveur'};

        return response.json()
      })
      .then(data => {
        setLoading(false)

        if (data.errors) {
          setErrors(formatErrors(data.errors))
          return null;
        }
        else
          return true;
      })
      .catch(e => {
        console.log('Error: ', e)

        setLoading(false)
        setErrors(e)
        return false;
      })
  }

  const resetErrors = () => {
    setErrors({})
  }

  return { loading, errors, create, update, resetErrors }
}


export const del = async (target, id) => {
  return fetch(`${url.backend}/${target}/${id}`, {method: 'DELETE'})
    .then(() => {
      return true
    })
    .catch(e => {
      console.log(e)
      return false
    });
}

const formatBody = (data) => {
  let {spec, ...body} = data;
  for (const key in data) {
    if (key.includes('Date'))
      body[key] = body[key].toISOString().split('T')[0].replace(/-/g, '/')
  }
  return body
}


const formatErrors = (errors) => {
  return errors.reduce((acc, error) => {
    const type = error.path;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(error.msg);
    return acc;
  }, {});
}