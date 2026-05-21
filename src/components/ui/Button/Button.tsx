import { AppText } from '@/components/ui/AppText';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  title = 'Ok',
  onPress = () => {},
  variant = 'primary',
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <AppText variant="body" color="#FFFFFF" align="center">
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    width: '100%',
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#220C01',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
});
