import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [itemId, setItemId] = useState(null);
  const [buscarNome, setBuscarNome] = useState(null);

  // GET dos produtos Total ou por Nome
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const endpoint = buscarNome ? `${url}/buscar?nome=${buscarNome}` : url;

        const res = await fetch(endpoint);
        const json = await res.json();

        setData(json);

        setLoading(false);
      } catch (error) {
        console.error(error.message);

        setError("Houve um erro ao carregar os dados!");
      }
    };

    fetchData();
  }, [url, callFetch, buscarNome]);


  // Lógica para Tipo do Method
  const httpConfig = (data, method, id) => {
    const token = localStorage.getItem("token");

     const commonHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    };


    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify(data),
      });

      setMethod("POST");

    } else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: commonHeaders,
      });

      setMethod("DELETE");
      setItemId(data);

    } else if (method === "PUT") {
      setConfig({
        method: "PUT",
        headers: commonHeaders,
        body: JSON.stringify(data),
      });

      setMethod("PUT");
      setItemId(id);
    }
  };

  
  // Lógica de Requisição para o Method
  useEffect(() => {
    const httpRequest = async () => {
      setLoading(true);

      try {
        if (method === "POST") {
          let fetchOptions = [url, config];

          const res = await fetch(...fetchOptions);
          const json = await res.json();

          // Verifica se a URL é de login
          if (url.includes("login") && json.token) {
          localStorage.setItem("token", json.token); // Armazena o token JWT
        }

          setCallFetch(json);

          setLoading(false);
        } else if (method === "PUT") {
          const updateUrl = `${url}/${itemId}`;

          const res = await fetch(updateUrl, config);
          const json = await res.json();

          setCallFetch(json);
        } else if (method === "DELETE") {
          const deleteUrl = `${url}/${itemId}`;

          const res = await fetch(deleteUrl, config);
          const json = await res.json();

          setCallFetch(json);
        }
      } catch (error) {
        console.error("Erro na requisição:", error.message);
        setError("Algo deu errado na requisição.");
      } finally {
        setLoading(false);
      }
    };

    httpRequest();
  }, [config, method]);

  return { data, httpConfig, loading, error, setBuscarNome };
};
