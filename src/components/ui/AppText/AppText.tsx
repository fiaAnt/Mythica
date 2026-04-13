import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface AppTextProps {
    children: string;
    variant?: 'title' | 'subtitle' | 'body' | 'small';
    color?: string;
    align?: 'left' | 'center' | 'right';
    style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
    children,
    variant = 'body',
    color,
    align = 'left',
    style,
}) => {
    return (
        <Text
            style={[
                styles[variant],
                { textAlign: align },
                color && { color },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'Inria Sans',
        color: '#000',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Inria Sans',
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        
        
    },
    small: {
        fontSize: 14,
        color: '#666',
    },
});
