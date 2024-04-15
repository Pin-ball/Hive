import useStore from "@src/store/research.js";
import {url} from "@src/utils/config.js";

const infiniteScrollTrigger = (y, data, action) => {
  // TODO: Changer tableHeight pour une ref sur le tableau
  const tableHeight = 800;
  const contextHeight = data.length * 46;
  const top = Math.abs(y);

  if (contextHeight - top - tableHeight < 300) {
    action()
  }
};

const getListingUrl = () => {
  const { book, author, availability} = useStore();

  let newUrl = new URL(`${url.backend}/book/list`);

  if (book.value.length > 0)
    newUrl.searchParams.append('ids', book.value.join(','));
  if (author.value.length > 0)
    newUrl.searchParams.append('authorIds', author.value.join(','));

  for (const key of availability) {
    newUrl.searchParams.append(key, 'true');
  }

  return newUrl.href
}

const formatToForm = (data) => {
    for (const key in data) {
      if (key.includes('Date'))
        data[key] = new Date(data[key])
    }
    return data
}

export {
  infiniteScrollTrigger,
  getListingUrl,
  formatToForm
}