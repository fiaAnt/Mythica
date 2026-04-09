import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';

interface ButtonProps {
    title?: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
    title = 'Ok',
    onPress = () => {},
    variant = 'primary'
}) => {
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
        marginVertical: 10,
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
