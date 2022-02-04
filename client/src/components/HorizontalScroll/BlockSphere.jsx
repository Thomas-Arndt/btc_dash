import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './BlockSphere.module.css';

const BlockSphere = (props) => {
    const { blockData, blockStyle, lockout, selectBlock, setSelectedTransaction } = props;
    const [ minFee, setMinFee ] = useState(0);
    const [ maxFee, setMaxFee ] = useState(0);
    const ref = React.createRef();
    
        useEffect(() => {
            if(blockData.id){
                axios.get(`https://mempool.space/api/block/${blockData.id}/txs`)
                    .then(res=>{
                        let min = res.data[1].fee/res.data[1].size;
                        let max = res.data[1].fee/res.data[1].size;
                        for(const txn of res.data.slice(1)){
                            if(txn.fee/txn.size < min){
                                min = txn.fee/txn.size;
                            }
                            if(txn.fee/txn.size > max){
                                max = txn.fee/txn.size;
                            }
                        }
                        setMinFee(min);
                        setMaxFee(max);
                    })
                    .catch(err=>console.log(err))
            }
        }, [])

    const alignment = {alignItems: blockStyle.align}
    
    const bubbleColor = {
        backgroundColor: blockStyle.color
    }    

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    const handleSelect = (e) => {
        if(!lockout && blockData.id){
            selectBlock(blockData.id);
            setSelectedTransaction(null);
            // console.log(blockData);
        }
    }

    return (
        <div 
            className="d-flex"
            style={alignment}>
            <div
                ref={ref}
                onClick={handleSelect} 
                style={bubbleColor}
                className={blockData.height ? styles.confirmed : styles.pending}>
                {/*Confirmed Blocks */}
                {blockData.height && <p className={styles.dataText}>{blockData.height}</p>}
                {blockData.timestamp && <p className={styles.dataText}>~{Math.floor((moment().unix()-blockData.timestamp)/60)} minutes ago</p>}
                {blockData.tx_count && <p className={styles.dataText}>{blockData.tx_count.toLocaleString('en-US')} transactions</p>}
                {blockData.id && <p className={styles.dataText}>{Math.floor(minFee)}-{Math.floor(maxFee)} sat/vB</p>}
                {blockData.size && <p className={styles.dataText}>{roundTo(blockData.size/1024/1024, 2)} MB</p>}
                {/* Pending Blocks */}
                {blockData.medianFee && <p className={styles.dataText}>~{Math.round(blockData.medianFee)} sat/vB</p>}
                {blockData.feeRange && <p className={styles.dataText}>{Math.round(blockData.feeRange[0])}-{Math.round(blockData.feeRange[blockData.feeRange.length-1].toLocaleString('en-US'))} sat/vB</p>}
                {blockData.nTx && <p className={styles.dataText}>{blockData.nTx.toLocaleString('en-US')} transactions</p>}
                {blockData.blockSize && <p className={styles.dataText}>{roundTo((blockData.blockSize/1024/1024),2)} MB</p>}
            </div>
        </div>
    )
}

export default BlockSphere;