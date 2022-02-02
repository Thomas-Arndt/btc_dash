import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
import TransactionDetailsHeader from '../components/TransactionDetails/TransactionDetailsHeader';

const TransactionDetails = (props) => {
    const { blockId } = props;
    const [ transactions, setTransactions ] = useState([]);
    let style = "";

    useEffect(() => {
        axios.get(`https://mempool.space/api/block/${blockId}/txids`)
            .then(res => {
                setTransactions(res.data);
            })
            .catch(err => console.log(err))
    }, [blockId]);

    if(isMobile){
        style = "py-3 col-12"
    } else {
        style = "py-3 col-5";
    }

    return (
        <div className={style} style={{border: '2px solid #CC33CC', borderRadius: '7px', flex: 1}}>
            <TransactionDetailsHeader />
            <HorizontalScroll transactions={[...transactions.slice(0,25)]} />
        </div>
    )
}

export default TransactionDetails;