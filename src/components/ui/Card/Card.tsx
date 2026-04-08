import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import card from '@assets/images/card.png';

interface CardProps {
    overlayImage?: ImageSourcePropType | string | null;
    onPress?: () => void;
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    overlayImage = null,
    onPress,
    children,
}) => {
    const getImageSource = () => {
        if (!overlayImage) return null;
        if (typeof overlayImage === 'string') {
            return { uri: overlayImage };
        }
        return overlayImage;
    };

    const CardContent = () => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={card} style={styles.baseImage} />
                {overlayImage && (
                    <View style={styles.overlayContainer}>
                        <Image source={getImageSource()} style={styles.overlayImage} />
                    </View>
                )}
                {children && <View style={styles.content}>{children}</View>}
            </View>
        </View>
    );
    
    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress}>
                <CardContent />
            </TouchableOpacity>
        );
    }
    
    return <CardContent />;
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 320,
        margin: 10,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    overlayContainer: {
        position: 'absolute',
        top: 30,
        alignSelf: 'center',
        zIndex: 10,
    },
    overlayImage: {
        width: 180,
        height: 240,
        resizeMode: 'contain',
    },
    content: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        padding: 12,
    },
});
