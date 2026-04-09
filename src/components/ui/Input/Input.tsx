import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { AppText } from '@/components/ui/AppText';

interface InputProps {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    icon?: ImageSourcePropType;
    onSearch?: () => void;
}

export const Input: React.FC<InputProps> = ({
    placeholder = 'Поиск...',
    value = '',
    onChangeText = () => {},
    onSearch = () => {},
    icon,
}) => {
    return (
            <View style={styles.container}>
            {icon && (
                           <Image
                               source={icon}
                               style={styles.icon}
                           />
                       )}
            <TextInput
            style={[styles.input, !icon && styles.inputWithoutIcon]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            />
            {value.length > 0 && (
                                  <TouchableOpacity onPress={() => onChangeText('')}>
                                  <AppText variant="body" >✕</AppText>
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
    inputWithoutIcon: {
            marginLeft: 0,
        },
});
