const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
  console.log('API_URL:', API_URL);
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    if (!res.ok) {
      console.error('API Error:', data);
      throw new Error(`Error: ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchProductById(id: number) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) {
      console.error('API Error:', data);
      throw new Error(`Error: ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}