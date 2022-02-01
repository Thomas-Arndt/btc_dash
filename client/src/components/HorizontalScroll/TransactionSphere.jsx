import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const TransactionSphere = (props) => {
    const { transactionId, blockStyle, lockout } = props;
    const [ transactionAmount, setTransactionAmount ] = useState(null);
    const [ transaction, setTransaction ] = useState(null);
    
        useEffect(() => {
            axios.get(`http://mempool.space/api/tx/${transactionId}`)
                .then(res => {
                    // console.log(res.data);
                    setTransaction(res.data)
                    let txnAmt = 0;
                    for(const vin of res.data.vin){
                        txnAmt += vin.prevout.value;
                    }
                    setTransactionAmount(txnAmt);
                })
                .catch(err => console.log(err))
        }, [transactionId])

    const alignment = {alignItems: blockStyle.align}
    
    const bubbleStyle = {
        backgroundColor: blockStyle.color,
        border: '2px solid #FFFFFF',
        minWidth: '160px',
        minHeight: '160px',
        borderRadius: '50%',
        margin: '7px',
        textAlign: 'center',
        zIndex: 1
    }    

    const dataText = {
        margin: '0',
        userSelect: 'none',
        color: 'white',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    const handleSelect = (e) => {
        if(!lockout){
            console.log(transaction);
        }
    }

    return (
        <div 
            className="d-flex"
            style={alignment}>
            <div
                onClick={handleSelect} 
                style={bubbleStyle}
                className="d-flex flex-column justify-content-center">
                {transactionAmount ? 
                    <p style={dataText}>{transactionAmount/100000000 < 1 ? '<1 BTC' : '~'+Math.round(transactionAmount/100000000)+' BTC'}</p> :
                    <p style={dataText}>Coinbase</p>}
            </div>
        </div>
    )
}

export default TransactionSphere;