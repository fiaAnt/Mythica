import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import searchIcon from '@assets/images/search.png';

interface InputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

export const Input = ({
  placeholder = 'Поиск...',
  value = '',
  onChangeText = () => {},
  onSearch = () => {},
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <AppText variant="body">✕</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFD4C2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  clearIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
});
