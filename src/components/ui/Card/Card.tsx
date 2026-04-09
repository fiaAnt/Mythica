import card from '@assets/images/card.png';
import React, { useMemo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CardProps {
    overlayImage?: ImageSourcePropType | string | null;
    onPress?: () => void;
    children?: React.ReactNode;
    cardWidth?: number;
}

export const Card: React.FC<CardProps> = ({
    overlayImage = null,
    onPress,
    children,
    cardWidth,
}) => {
    const getImageSource = (): ImageSourcePropType | undefined => {
        if (!overlayImage) return undefined;
        if (typeof overlayImage === 'string') {
            return { uri: overlayImage };
        }
        return overlayImage;
    };

    const overlaySource = getImageSource();
    const overlayDynamicStyle = useMemo(() => {
        if (!cardWidth) {
            return styles.overlayImage;
        }

        const cardHeight = cardWidth / 0.7;
        return [
            styles.overlayImage,
            {
                width: cardWidth * 0.6,
                height: cardHeight * 0.7,
            },
        ];
    }, [cardWidth]);

    const CardContent = () => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={card} style={styles.baseImage} />
                {overlaySource && (
                    <View style={styles.overlayContainer}>
                        <Image source={overlaySource} style={overlayDynamicStyle} />
                    </View>
                )}
                {children && <View style={styles.content}>{children}</View>}
            </View>
        </View>
    );

    if (onPress) {
        return (
                <TouchableOpacity onPress={onPress} style={styles.touchable}>
                <CardContent />
                </TouchableOpacity>
                );
    }
    
    return <CardContent />;
};

const styles = StyleSheet.create({
    touchable: {
        width: '100%',
    },
    card: {
        width: '100%',
        aspectRatio: 0.6,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: '#fff',
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    overlayImage: {
        resizeMode: 'contain',
    },
    content: {
        position: 'absolute',
        bottom: 10,
        padding: 12,
    },
});
