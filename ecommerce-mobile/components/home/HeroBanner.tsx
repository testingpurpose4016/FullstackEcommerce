import React from 'react';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { ImageBackground } from '@/components/ui/image-background';
import { Button, ButtonText } from '@/components/ui/button';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  onPress?: () => void;
};

export const HeroBanner = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onPress,
}: HeroBannerProps) => {
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      className="h-[200px] w-full justify-end p-6"
    >
      <VStack space="sm" className="max-w-[70%]">
        <Heading size="xl" className="text-white">
          {title}
        </Heading>
        <Text className="text-white mb-2">
          {subtitle}
        </Text>
        <Button className="self-start" onPress={onPress}>
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </VStack>
    </ImageBackground>
  );
};

export default HeroBanner;
