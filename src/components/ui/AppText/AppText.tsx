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
        fontSize: 28,
//        fontWeight: 'bold',
        fontFamily: 'Georgia',
        color: '#000',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Georgia',
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
    },
    small: {
        fontSize: 12,
        color: '#666',
    },
});
