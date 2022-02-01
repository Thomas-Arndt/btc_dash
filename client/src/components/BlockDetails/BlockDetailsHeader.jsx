import React, { useState } from 'react';
import axios from 'axios';

const BlockDetailsHeader = (props) => {
    const { blockData, setSelectedBlock } = props;

    const handleNextBlock = () => {
        if(blockData.height-1 >= 0){
            axios.get(`http://mempool.space/api/block-height/${blockData.height-1}`)
                .then(res => {
                    console.log(res.data);
                    setSelectedBlock(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    const handlePrevBlock = () => {
        axios.get(`http://mempool.space/api/blocks/tip/height`)
            .then(res => {
                console.log(res.data);
                if(blockData.height+1 <= res.data){
                    axios.get(`http://mempool.space/api/block-height/${blockData.height+1}`)
                .then(res => {
                    console.log(res.data);
                    setSelectedBlock(res.data)
                })
                .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center gap-3" style={{borderBottom: '2px dotted white'}}>
            <h2 className="text-white">Block</h2>
            <div className="d-flex  align-items-center gap-2">
                <svg 
                    onClick={handlePrevBlock}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="22" height="22" 
                    fill="#FF6600" 
                    className="mb-2"
                    style={{cursor: 'pointer'}} 
                    viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
                <h2 className="text-white">{blockData.height}</h2>
                <svg 
                    onClick={handleNextBlock}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="22" height="22" 
                    fill="#FF6600" 
                    className="mb-2" 
                    style={{cursor: 'pointer'}} 
                    viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
            </div>
        </div>
    )
}

export default BlockDetailsHeader;