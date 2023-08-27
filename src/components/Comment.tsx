import { ThumbsUp, Trash } from 'phosphor-react'

import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps{
    content: String;
    onDeleteComment: (comment: String)=> void;
    name: string;
    avatarUrl: string;
}

export const Comment = ({content, onDeleteComment, name, avatarUrl}: CommentProps) => {
    const [likeCount, setLikeCount] = useState(0);

    const handleDeleteComment = () => {
        onDeleteComment(content)
    }

    const handleLikeComment = () => {
        setLikeCount((likeCountState)=>{
            return likeCountState + 1
        })
    }

   
    return(
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src={avatarUrl}
                alt=''
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{name}</strong>
                            <time title='24 de Agosto as 20:07:30' dateTime='2023-08-24 20:07:30'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar'>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}
