import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

// Todos atributos que já existem na image como alt e src não preciso declarar se
// o tipo dela, basta colocar o imgHTMLAttributs
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
        hasBorder?: boolean;
}

// dessa forma estou tirando a hasBorder como propriedade e colocando oque sobrou
// de propriedades
export const Avatar = ({hasBorder = true, ...props}: AvatarProps) => {

 // propriedade que eu passar para o avatar vai vir automaticamente para meu img
    return(
            <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
                {...props}
            />
    )
}
