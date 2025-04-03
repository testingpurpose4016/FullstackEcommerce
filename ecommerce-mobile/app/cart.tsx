import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { FlatList, Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { useAuth } from '@/store/authStore';

export default function CartScreen() {
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);
  const router = useRouter();
  const isLoggedIn = useAuth((state: any) => !!state.token);

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price, // MANAGE FORM SERVER SIDE
        }))
      ),
    onSuccess: (_data) => {
      Alert.alert('Success', 'Your order is confirmed! We will deliver it to your address.');
      resetCart();
      router.replace('/');
    },
    onError: (error) => {
      console.log(error);
      Alert.alert('Error', 'There was an error processing your order. Please try again.');
    },
  });

  const onCheckout = async () => {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please log in to complete your order.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/login') }
      ]);
      return;
    }
    createOrderMutation.mutateAsync();
  };

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
