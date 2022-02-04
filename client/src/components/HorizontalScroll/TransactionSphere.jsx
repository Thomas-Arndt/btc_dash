import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TransactionSphere.module.css';

const TransactionSphere = (props) => {
    const { transactionId, blockStyle, lockout, selectedBlock, selectedTransaction, setScrollLock, scrollLock } = props;
    const [ transactionAmount, setTransactionAmount ] = useState(null);
    const [ transaction, setTransaction ] = useState(null);
    const [ selected, setSelected ] = useState(false);
    const bubbleRef = React.createRef();

        useEffect(() => {
            axios.get(`http://mempool.space/api/tx/${transactionId}`)
                .then(res => {
                    // console.log(res.data);
                    setTransaction(res.data)
                    let txnAmt = 0;
                    for(const vin of res.data.vin){
                        !vin.is_coinbase && (txnAmt += vin.prevout.value);
                    }
                    setTransactionAmount(txnAmt);
                })
                .catch(err => console.log(err))
            setSelected(false);
            bubbleRef.current.classList = styles.preview;
        }, [transactionId]);

    

    const alignment = {alignItems: blockStyle.align}

    const bubbleColor = {backgroundColor: blockStyle.color}  

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.innerText);
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    const handleSelect = (e) => {
        let element = null;
        if(e.target.getAttribute('name')==="transactionBubble"){
            element = e.target;
        }
        else if(e.target.getAttribute('name')==="transactionDetails"){
            element = e.target.parentNode;
        }
        if(!lockout){
            for(const item of element.classList){
                if(item===styles.preview){
                    element.classList.add(styles.selected);
                    element.classList.remove(styles.preview);
                } 
                else if(item===styles.deselected){
                    element.classList.add(styles.selected);
                    element.classList.remove(styles.deselected);
                } 
                else if(item===styles.selected){
                    element.classList.add(styles.deselected)
                    element.classList.remove(styles.selected)
                }
            }
            setScrollLock(!scrollLock)
            setSelected(!selected);
        }
    }

    return (
        <div 
            className="d-flex"
            style={alignment}>
            <div
                name="transactionBubble"
                ref={bubbleRef}
                onClick={handleSelect} 
                style={bubbleColor}
                className={styles.preview}>
                {!transactionAmount && !selected && <p className={styles.previewText}>Coinbase</p>}
                {!transactionAmount && selected && 
                    <div>
                        <p className={styles.dataText}>Awarded to:</p>
                        <p className={styles.overFlowEllipsis} 
                            style={{width: '300px'}}
                            onClick={copyToClipboard}>
                                {transaction.vout[0].scriptpubkey}
                        </p>
                    </div>}
                {transactionAmount > 0 && !selected && <p className={styles.previewText}>{transactionAmount/100000000 < 1 ? '<1 BTC' : '~'+Math.round(transactionAmount/100000000)+' BTC'}</p>}
                {transactionAmount > 0 && selected &&
                    <div 
                        name="transactionDetails"
                        style={{width: '300px', overflowY: 'scroll', margin: '10px 20px', backgroundColor: 'rgba(255,255,255,.25', padding: '10px'}}
                        className={`${styles.txnScroll} ${styles.expand}`}>
                        <p style={{margin: '0', userSelect: 'none', color: 'white', fontSize: '11px', textDecoration: 'underline', pointerEvents: 'none'}}>Transaction ID:</p>
                        <p 
                            onClick={copyToClipboard}
                            className={`${styles.overFlowEllipsis} mb-2`} >
                                {transaction.txid}</p>
                        {transaction.status.confirmed ? 
                            <p 
                                style={{color: 'white', fontSize: '16px', userSelect: 'none', pointerEvents: 'none'}}>Confirmed on Block {transaction.status.block_height}</p> : 
                            <p style={{pointerEvents: 'none'}}>Unconfirmed</p>}
                        <p 
                            className={styles.detailsHeader}>
                                Inputs</p>
                        {transaction.vin.map((vin, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-end border-bottom mb-2">
                                <p onClick={copyToClipboard}
                                    className={styles.overFlowEllipsis} >
                                        {vin.prevout.scriptpubkey}</p>
                                <p className={styles.dataText} >
                                        {vin.prevout.value/100000000} BTC</p>
                            </div>
                        ))}
                        <p className={styles.detailsHeader}>
                            Outputs</p>
                        {transaction.vout.map((vout, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-end border-bottom mb-2">
                                <p onClick={copyToClipboard}
                                    className={styles.overFlowEllipsis} >
                                        {vout.scriptpubkey}</p>
                                <p className={styles.dataText} >
                                        {roundTo((vout.value/100000000),8)} BTC</p>
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
    )
}

export default TransactionSphere;