import { useState, useEffect } from "react";
import useStore from "@src/store/research.js";

export const useInfiniteScroll = (url) => {
  const { refresh } = useStore();

  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState([0]);

  const [newData, setNewData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const newUrl = new URL(url);
  newUrl.searchParams.append('page', page.toString());


  useEffect(() => {
    reset()

    if (page === 1 && newData !== null)
      Fetch(newUrl)
  }, [url, refresh]);


  useEffect(() => {
    if (!pageList.includes(page))
      Fetch(newUrl)
  }, [page]);


  useEffect(() => {
    if (newData === null || pageList.includes(page)) return

    setPageList(prev => [...prev, page])
    setData(prev => [...prev, ...newData])
  }, [newData]);


  const next = () => {
    const lastPage = pageList.slice(-1)[0]
    setPage(lastPage + 1)
  }

  const reset = () => {
    setData([])
    setPage(1)
    setPageList([0])
  }

  const Fetch = (url) => {
    setIsLoading(true)
    setError(null)
    fetch(url)
      .then(res => {
        if (res.status === 200)
          return res.json()
        throw 'No content'
      })
      .then(json => {
        setNewData(json)
      })
      .catch(e => {
        setError(e)
      })
      .finally(() => setIsLoading(false))
  }

  return { data, isLoading, error, next, reset };
};
