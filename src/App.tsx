import './global.css';
import styles from './components/App.module.css'

import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar';

import {useState} from 'react'

// Precisamos de:
// author {avatar_url: '', name: '', role ''}
// plublishedAt: date
// content: String

type contentDate = {type: 'paragraph', content: string} | {type: 'link', content: string}


const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/MaykBrito.png',
      name: 'Mayk Brito',
      role: 'Web Developer',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},

      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},

      {type: 'link', content: '👉 jane.design/doctorcare'},
    ] as contentDate[],
    publishedAt: new Date('2023-08-24 20:07:30')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/Matheussmaced.png',
      name: 'Matheus Macêdo',
      role: 'Web Developer',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},

      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},

      {type: 'link', content: '👉 jane.design/doctorcare '},
    ]as contentDate[],
    publishedAt: new Date('2023-08-23 20:07:30')
  },
]
   
function App() {

  const [avatarUrl, setAvatarUrl] = useState('https://cdn-icons-png.flaticon.com/512/3641/3641963.png')
  const [name, setName] = useState('Usuario')
  const [bio, setBio] = useState('Cargo')

  function gitHubUser(){
    const userGitHub = prompt('Digite seu GitHub aqui (Ex : Matheussmaced)')
      const xhr = new XMLHttpRequest()
  
      xhr.open('GET', `https://api.github.com/users/${userGitHub}`)
      xhr.send(null)
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            const profileUser = JSON.parse(xhr.responseText)
            
            const avatarUrl = profileUser.avatar_url;
            const name = profileUser.name;
            const bio = profileUser.bio
            
            setAvatarUrl(avatarUrl)
            setName(name)
            setBio(bio)
        }
      }
    }

  return (
    <>
      <Header />
      
      <div className={styles.wrapper}>
        <aside>
          <Sidebar onGitHubUser ={gitHubUser} name={name} avatarUrl={avatarUrl} bio={bio}/>
        </aside>
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author ={post.author}
                content ={post.content}
                publishedAt ={post.publishedAt}
                avatarUrl={avatarUrl}
                name={name}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

export default App