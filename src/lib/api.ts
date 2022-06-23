export const apiRaw = async (url: string, init?: RequestInit): Promise<Response> => {
  // Add API prefix to request URL
  const apiUrl = `${import.meta.env.VITE_LOCAL_DB_API}/api/${url}`;

  // Call API
  const response = await fetch(apiUrl, {
    ...init,
    credentials: 'include',
  });

  // if (!response.ok) {
  //   throw await buildHttpError(response);
  // }

  return response;
};

export const apiFetch = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await apiRaw(url, init);

  return await response.json();
};