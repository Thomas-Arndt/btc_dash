import React from 'react';
import { isMobile } from 'react-device-detect';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar';

const NavBar = (props) => {
    const { setSelectedBlock } = props;

    return (
        <div 
            style={{backgroundColor: '#0E0042', borderBottom: '2px solid white'}} 
            className="d-flex justify-content-between align-items-center px-3" >
            <h1 className={styles.titleOrange}>
                BTC
                <span className={styles.titleWhite}>
                    dash
                </span>
            </h1>
            {!isMobile && <SearchBar setSelectedBlock={setSelectedBlock} />}
        </div>
    )
}

export default NavBar;