import { useEffect, useState } from 'react';

export const useFetch = (url) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [itemId, setItemId] = useState(null);

  // GET dos produtos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch]);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod("POST");
    } else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMethod("DELETE");
      setItemId(data);
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      if (!config) return;

      setLoading(true);

      let res;
      try {
        if (method === "POST") {
          res = await fetch(url, config);
        } else if (method === "DELETE") {
          const deleteUrl = `${url}/${itemId}`;
          res = await fetch(deleteUrl, config);
        }

        // Verifica se a resposta tem corpo JSON
        const contentType = res.headers.get("content-type");
        let json = null;

        if (contentType && contentType.includes("application/json")) {
          json = await res.json();
        }

        setCallFetch(json || true); // só para forçar reload
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error }; // <-- importante!
};