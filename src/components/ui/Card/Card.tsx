import { StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import card from '@assets/images/card.png';
import { CardContent } from '../CardContent';

interface CardProps {
  overlayImage?: ImageSourcePropType | string | null;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const Card = ({ onPress }: CardProps) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};
