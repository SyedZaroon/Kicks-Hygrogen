// src/hooks/useStorefrontQuery.js
import { useState, useEffect } from "react";
import { client } from "../utils/storefrontClient";

export function useStorefrontQuery(query, variables = {}) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));

    fetch(client.getStorefrontApiUrl(), {
      method: "POST",
      headers: client.getPublicTokenHeaders(),
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.errors) {
          setState({ data: null, loading: false, error: json.errors });
        } else {
          setState({ data: json.data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err });
      });

    return () => {
      cancelled = true;
    };
  }, [query, JSON.stringify(variables)]);

  return state;
}
