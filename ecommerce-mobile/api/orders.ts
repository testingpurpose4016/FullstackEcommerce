import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  const token = useAuth.getState().token as string | null;

  console.log('API_URL:', API_URL);
  console.log('Token:', token ? 'Token exists' : 'No token');
  console.log('Items:', JSON.stringify(items));

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
      body: JSON.stringify({ order: {}, items }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('API Error:', data);
      throw new Error(`Order creation failed: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
}
