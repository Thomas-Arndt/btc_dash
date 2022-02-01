import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const BlockSphere = (props) => {
    const { blockData, blockStyle, lockout, selectBlock } = props;
    const [ transactions, setTransactions ] = useState({});
    const [ minFee, setMinFee ] = useState(0);
    const [ maxFee, setMaxFee ] = useState(0);
    
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

    const diameter = ((blockData.size/1024/1024)/2)*160

    const alignment = {alignItems: blockStyle.align}
    
    const bubbleStyle = {
        backgroundColor: blockStyle.color,
        border: '2px solid #FFFFFF',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        margin: '7px',
        textAlign: 'center',
        zIndex: 1
    }    

    const dataText = {
        margin: '0',
        userSelect: 'none',
        color: 'white'
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    const handleSelect = (e) => {
        if(!lockout && blockData.id){
            selectBlock(blockData.id)
            console.log(blockData);
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
                {/*Confirmed Blocks */}
                {blockData.height && <p style={dataText}>{blockData.height}</p>}
                {blockData.timestamp && <p style={dataText}>~{Math.floor((moment().unix()-blockData.timestamp)/60)} minutes ago</p>}
                {blockData.tx_count && <p style={dataText}>{blockData.tx_count} transactions</p>}
                {blockData.id && <p style={dataText}>{Math.floor(minFee)}-{Math.floor(maxFee)} sat/vB</p>}
                {blockData.size && <p style={dataText}>{roundTo(blockData.size/1024/1024, 2)} MB</p>}
                {/* Pending Blocks */}
                {blockData.medianFee && <p style={dataText}>~{Math.round(blockData.medianFee)} sat/vB</p>}
                {blockData.feeRange && <p style={dataText}>{Math.round(blockData.feeRange[0])}-{Math.round(blockData.feeRange[blockData.feeRange.length-1])} sat/vB</p>}
                {blockData.nTx && <p style={dataText}>{blockData.nTx} transactions</p>}
                {blockData.blockSize && <p style={dataText}>{roundTo((blockData.blockSize/1024/1024),2)} MB</p>}
            </div>
        </div>
    )
}

export default BlockSphere;