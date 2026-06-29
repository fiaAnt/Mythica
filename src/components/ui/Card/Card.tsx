import { TouchableOpacity } from 'react-native'
import { CardContent } from '../CardContent'

interface CardProps {
  overlayImage?: React.ReactNode
  onPress?: () => void
  cardWidth: number
  children?: React.ReactNode
}

export const Card = ({ onPress, overlayImage, children, cardWidth }: CardProps) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <CardContent cardWidth={cardWidth} overlayImage={overlayImage}>
          {children}
        </CardContent>
      </TouchableOpacity>
    )
  }

  return <CardContent overlayImage={overlayImage}>{children}</CardContent>
}
