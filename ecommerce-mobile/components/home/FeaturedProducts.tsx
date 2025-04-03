import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Button, ButtonText } from '@/components/ui/button';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type FeaturedProductsProps = {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
};

export const FeaturedProducts = ({ 
  products, 
  onProductPress, 
  onAddToCart 
}: FeaturedProductsProps) => {
  return (
    <Box className="py-4 bg-white">
      <Heading size="md" className="px-4 mb-4">
        Featured Products
      </Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
        <HStack space="md" className="px-2">
          {products.map((product) => (
            <Card key={product.id} className="w-[250px]">
              <Box className="relative">
                <Image
                  source={{ uri: product.image }}
                  className="h-[180px] w-full rounded-t-lg"
                  resizeMode="contain"
                />
                <Box className="absolute top-2 left-2">
                  <Badge action="error" variant="solid">
                    <BadgeText>SALE</BadgeText>
                  </Badge>
                </Box>
              </Box>
              <VStack className="p-3">
                <Text className="text-sm font-normal mb-1 text-typography-700 truncate">
                  {product.name}
                </Text>
                <Heading size="sm" className="mb-2">
                  ${product.price}
                </Heading>
                <Button 
                  size="sm"
                  onPress={() => onAddToCart?.(product)}
                >
                  <ButtonText>Add to Cart</ButtonText>
                </Button>
              </VStack>
            </Card>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default FeaturedProducts;
