import {url} from "@src/utils/config.js";

const update = async (id, body) => {
  return fetch(`${url.backend}/borrow/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then(() => {
    return true
  })
  .catch(e => {
    console.log(e)
    return false
  });
}

export {
  update
}