const API_BASE = 'https://localhost:60974';

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export default http;