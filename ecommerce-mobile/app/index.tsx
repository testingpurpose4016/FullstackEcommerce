import { ActivityIndicator, ScrollView } from 'react-native';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text';
import { HeroBanner, CategoryList, FeaturedProducts, PromoBanner, ProductGrid } from '@/components/home';

// Mock categories data
const categories = [
  { id: 1, name: 'Electronics', icon: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/electronics.jpg' },
  { id: 2, name: 'Fashion', icon: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/fashion.jpg' },
  { id: 3, name: 'Home', icon: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/home.jpg' },
  { id: 4, name: 'Beauty', icon: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/beauty.jpg' },
];

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  // Split products for different sections
  const featuredProducts = data.slice(0, 2);
  const allProducts = data.slice(0, 10);

  return (
    <ScrollView className="flex-1 bg-background-50">
      <HeroBanner
        title="Summer Sale"
        subtitle="Up to 50% off on selected items"
        buttonText="Shop Now"
        imageUrl="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/banner.jpg"
      />

      <CategoryList
        categories={categories}
      />

      <FeaturedProducts
        products={featuredProducts}
      />

      <PromoBanner
        title="Free Shipping"
        subtitle="On all orders over $50"
        buttonText="Learn More"
        imageUrl="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/shipping.png"
      />

      <ProductGrid
        title="All Products"
        products={allProducts}
        numColumns={numColumns as number}
      />
    </ScrollView>
  );
}
