import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface AppTextProps {
    children: string;
    variant?: 'title' | 'subtitle' | 'body' | 'small';
    color?: string;
    align?: 'left' | 'center' | 'right';
}

export const AppText: React.FC<AppTextProps> = ({
    children,
    variant = 'body',
    color,
    align = 'left'
}) => {
    return (
        <Text
            style={[
                styles[variant],
                { textAlign: align },
                color && { color }
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
