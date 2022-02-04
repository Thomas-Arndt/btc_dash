import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
    const { setSelectedBlock, setSelectedTransaction } = props;
    const [ searchInput, setSearchInput ] = useState('');
    let style = '';
    
        if(isMobile) {
            style = "d-flex align-items-center position-relative"
        } else {
            style = "d-flex align-items-center position-relative col-6";
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.length < 10) {
            axios.get(`https://mempool.space/api/block-height/${searchInput}`)
                .then(res => {
                    // console.log(res.data);
                    setSelectedBlock(res.data)
                })
                .catch(err => console.log(err))
        }
        else if (searchInput.length === 64 && searchInput.startsWith('0'*7)){
            setSelectedBlock(searchInput);
        } else {
            axios.get(`https://mempool.space/api/tx/${searchInput}/status`)
                .then(res => {
                    // console.log(res.data);
                    setSelectedBlock(res.data.block_hash);
                })
                .catch(err => console.log(err))
            setSelectedTransaction(searchInput)
        }
        setSearchInput('')
    }

    return (
        <form onSubmit={handleSubmit} className={style}>
            <input
                type="text"
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                className="form-control"
                style={{border: '3px solid #ff6600', borderRadius: '7px', fontSize: '20px', padding: '5px 38px 5px 5px'}}
                placeholder="TXID, block height, or hash" />
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="26" height="26" fill="#ff6600" 
                className={styles.searchClear} viewBox="0 0 16 16"
                onClick={(e)=>setSearchInput('')}>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
        </form>
    )
}

export default SearchBar;