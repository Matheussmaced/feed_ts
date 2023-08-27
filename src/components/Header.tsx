import styles from './Header.module.css'

import igniteLogo from '../assets/ignite-logo.svg'

export const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <img src={igniteLogo} alt="Logo tipo do Ignite" />
                <h1>Ignite Feed</h1>
            </header>
        </>
    )
}