import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Define types for delivery information
export type DeliveryInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  notes?: string;
};

export async function createOrder(items: any[], deliveryInfo?: DeliveryInfo) {
  const token = useAuth.getState().token as string | null;

  console.log('API_URL:', API_URL);
  console.log('Token:', token ? 'Token exists' : 'No token');
  console.log('Items:', JSON.stringify(items));
  console.log('Delivery Info:', JSON.stringify(deliveryInfo));

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
      body: JSON.stringify({
        order: {
          paymentMethod: 'cash_on_delivery',
          deliveryInfo: deliveryInfo || {}
        },
        items
      }),
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
