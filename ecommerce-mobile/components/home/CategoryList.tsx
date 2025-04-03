import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type CategoryListProps = {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
};

export const CategoryList = ({ categories, onCategoryPress }: CategoryListProps) => {
  return (
    <Box className="py-4">
      <Heading size="md" className="px-4 mb-4">
        Shop by Category
      </Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
        <HStack space="md" className="px-2">
          {categories.map((category) => (
            <Pressable 
              key={category.id} 
              className="items-center w-[80px]"
              onPress={() => onCategoryPress?.(category)}
            >
              <Box className="bg-white rounded-full overflow-hidden w-[60px] h-[60px] mb-2">
                <Image
                  source={{ uri: category.icon }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Box>
              <Text className="text-center">{category.name}</Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default CategoryList;
