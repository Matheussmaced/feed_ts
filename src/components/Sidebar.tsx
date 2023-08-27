import styles from './Sidebar.module.css'

import backgroundSidebar from '../assets/background-sidebar.svg'
import {PencilLine} from 'phosphor-react'

import { Avatar } from './Avatar'


interface sidebarProps{
    onGitHubUser: ()=>void;
    bio: string;
    name: string;
    avatarUrl: string;
}

export const Sidebar = ({onGitHubUser, bio, name, avatarUrl}:sidebarProps) => {    
        
    return(
        <>
            <aside className={styles.sidebar}>
                <img className={styles.background} src={backgroundSidebar}/>

                <div className={styles.profile}>
                    <Avatar src={avatarUrl}/>

                    <strong>{name}</strong>
                    <span>{bio}</span>
                </div>

                <footer onClick={onGitHubUser}>
                    <a href="#">
                        <PencilLine size={20} />
                        Editar seu perfil
                    </a>
                </footer>
            </aside>
        </>
    )
}