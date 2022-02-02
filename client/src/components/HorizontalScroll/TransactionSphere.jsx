import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TransactionSphere.module.css';

const TransactionSphere = (props) => {
    const { transactionId, blockStyle, lockout, setScrollLock, scrollLock } = props;
    const [ transactionAmount, setTransactionAmount ] = useState(null);
    const [ transaction, setTransaction ] = useState(null);
    const [ selected, setSelected ] = useState(false);
    let bubbleStyle = {};

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
            setSelected(false);
        }, [transactionId])

    const alignment = {alignItems: blockStyle.align}
    
    if(selected){
        bubbleStyle = {
            backgroundColor: blockStyle.color,
            border: '2px solid #FFFFFF',
            width: '325px',
            height: '160px',
            borderRadius: '30px',
            margin: '7px',
            textAlign: 'center',
            zIndex: 1
        }
    }else{
        bubbleStyle = {
            backgroundColor: blockStyle.color,
            border: '2px solid #FFFFFF',
            minWidth: '160px',
            minHeight: '160px',
            borderRadius: '50%',
            margin: '7px',
            textAlign: 'center',
            zIndex: 1
        }
    }    

    const previewText = {
        margin: '0',
        userSelect: 'none',
        color: 'white',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    const dataText = {
        margin: '0',
        userSelect: 'none',
        color: 'white',
        fontSize: '11px'
    }

    const overFlowEllipsis = {
        userSelect: 'none',
        color: 'white',
        fontSize: '11px', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        cursor: 'pointer'
    }

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.innerText);
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    const handleSelect = (e) => {
        if(!lockout){
            // console.log(transaction);
            setScrollLock(!scrollLock)
            setSelected(!selected);
        }
    }

    return (
        <div 
            className="d-flex"
            style={alignment}>
            <div
                onClick={handleSelect} 
                style={bubbleStyle}
                className="d-flex flex-column justify-content-center align-items-center">
                {transactionAmount && !selected && <p style={previewText}>{transactionAmount/100000000 < 1 ? '<1 BTC' : '~'+Math.round(transactionAmount/100000000)+' BTC'}</p>}
                {!transactionAmount && !selected && <p style={previewText}>Coinbase</p>}
                {transactionAmount && selected &&
                    <div 
                        style={{width: '300px', overflowY: 'scroll', margin: '10px 20px', backgroundColor: 'rgba(255,255,255,.25', padding: '10px'}}
                        className={styles.txnScroll}>
                        <p style={{margin: '0', userSelect: 'none', color: 'white', fontSize: '11px', textDecoration: 'underline'}}>Transaction ID:</p>
                        <p 
                            onClick={copyToClipboard}
                            style={overFlowEllipsis} >
                                {transaction.txid}</p>
                        {transaction.status.confirmed ? 
                            <p 
                                style={{color: 'white', fontSize: '16px', userSelect: 'none'}}>Confirmed on Block {transaction.status.block_height}</p> : 
                            <p>Unconfirmed</p>}
                        <p 
                            style={{color: 'white', fontSize: '20px', fontWeight: 'bold', margin: '20px 0 10px 0', userSelect: 'none', textDecoration: 'underline'}}>
                                Inputs</p>
                        {transaction.vin.map((vin, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-end border-bottom mb-2">
                                <p 
                                    onClick={copyToClipboard}
                                    style={overFlowEllipsis} 
                                    className="m-0" >
                                        {vin.prevout.scriptpubkey}</p>
                                <p 
                                    style={dataText} 
                                    className="m-0 text-nowrap" >
                                        {vin.prevout.value/100000000} BTC</p>
                            </div>
                        ))}
                        <p style={{color: 'white', fontSize: '20px', fontWeight: 'bold', margin: '20px 0 10px 0', userSelect: 'none', textDecoration: 'underline'}}>
                            Outputs</p>
                        {transaction.vout.map((vout, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-end border-bottom mb-2">
                                <p 
                                    onClick={copyToClipboard}
                                    style={overFlowEllipsis} 
                                    className="m-0" >
                                        {vout.scriptpubkey}</p>
                                <p 
                                    style={dataText} 
                                    className="m-0 text-nowrap" >
                                        {roundTo((vout.value/100000000),8)} BTC</p>
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
    )
}

export default TransactionSphere;