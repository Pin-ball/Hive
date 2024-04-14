import { useState, useEffect } from "react";

export const useInfiniteScroll = (url) => {
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState([0]);
  const [data, setData] = useState([]);

  let newUrl = new URL(url);
  newUrl.searchParams.append('page', page.toString());
  const { data : fData, isLoading, error } = useFetch(newUrl.href)

  useEffect(() => {
    reset()
  }, [url]);

  useEffect(() => {
    if (fData !== null && !pageList.includes(page)) {
      setPageList(prev => [...prev, page])
      setData(prev => [...prev, ...fData])
    }

  }, [fData]);


  const next = () => {
    const lastPage = pageList.slice(-1)[0]
    setPage(lastPage + 1)
  }

  const reset = () => {
    setData([])
    setPage(1)
    setPageList([0])
  }

  return { data, isLoading, error, next, reset };
};


export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);

        const json = await response.json();
        setIsLoading(false);
        setData(json);
        setError(null);
      }
      catch (error) {
        setError(`${error} Could not Fetch Data`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};