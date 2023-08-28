import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css'
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

// tipos do obj author
interface Author {
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type : 'paragraph' | 'link';
    content: string;
}

// tenho que dizer qual que é o tipo do obj ao todo
// Quando é um array, coloco [] no final
interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
    name: string;
    avatarUrl: string
}



// para objetos não consigo definir a tipagem de cada obj na propriedade do obj
// tenho que informar qual que é o tipo do obj inteiro
export const Post = ({author , publishedAt, content, name, avatarUrl}:PostProps) => {
    const [comments, setComments] = useState<string[]>([])

    const [newCommentText, setNewCommentText] = useState('');

    // date published
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    });

    // amarzenar a data da publ do post relativa a agora
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true,
    })

    const handleCreateNewComment = (event: FormEvent) => {
        event.preventDefault()
        setComments([...comments, newCommentText]) // pego meu array e concateno
        setNewCommentText('');
    }

    //  Preciso passar tipo um paramentro para formEvent, pois ela está ativando dentro de um elemento do form, e não no proprio form
    const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) =>{
        event.target.setCustomValidity(''); // quando o usuario digitar algo, a mensagem reseta e então pode ser enviado

        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvadid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório'); // quando o usuario não digitar nada
    }

    function deleteComment(commentToDelete: String){
        // iremos criar uma nova lista de comentarios
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete; // Quero que me retorne todos os comentarios menos oque quero deletar
        })
        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentInputEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl} className={styles.avatar}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line =>{                       // publications
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    }else if(line.type === 'link'){
                        return <p key={line.content}> <a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                name = 'comment'
                placeholder='Deixe um comentário'
                value={newCommentText}
                onChange={handleNewCommentChange}
                onInvalid={handleNewCommentInvadid}
                required
                />

                <footer>
                    <button
                    type='submit' disabled={isNewCommentInputEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comments=>{
                    return( 
                        <Comment
                            key={comments} avatarUrl = {avatarUrl}
                            name = {name}
                            content = {comments}
                            onDeleteComment = {deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}

