import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
import TransactionDetailsHeader from '../components/TransactionDetails/TransactionDetailsHeader';

const TransactionDetails = (props) => {
    const { blockId } = props;
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        axios.get(`https://mempool.space/api/block/${blockId}/txids`)
            .then(res => {
                // console.log(res.data);
                setTransactions(res.data);
            })
            .catch(err => console.log(err))
    }, [blockId]);

    return (
        <div className="py-3 col-5" style={{border: '2px solid #CC33CC', flex: 1}}>
            <TransactionDetailsHeader />
            <HorizontalScroll transactions={[...transactions.slice(0,10)]} />
        </div>
    )
}

export default TransactionDetails;