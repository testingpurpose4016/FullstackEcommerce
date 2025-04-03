import React from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Button, ButtonText } from '@/components/ui/button';

type PromoBannerProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  onPress?: () => void;
};

export const PromoBanner = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onPress,
}: PromoBannerProps) => {
  return (
    <Box className="my-4 mx-4 bg-primary-50 p-4 rounded-lg">
      <HStack>
        <VStack className="flex-1">
          <Heading size="md" className="mb-2">
            {title}
          </Heading>
          <Text className="text-sm">{subtitle}</Text>
          <Button className="self-start mt-2" variant="outline" onPress={onPress}>
            <ButtonText>{buttonText}</ButtonText>
          </Button>
        </VStack>
        <Box className="w-[80px] h-[80px] justify-center items-center">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default PromoBanner;
