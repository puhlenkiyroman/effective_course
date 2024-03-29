import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout () {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
