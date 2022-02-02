import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import BlockDetailsHeader from '../components/BlockDetails/BlockDetailsHeader';
import BlockDataDisplay from '../components/BlockDetails/BlockDataDisplay';

const BlockDetails = (props) => {
    const { blockId, setSelectedBlock } = props;
    const [ blockDataM, setBlockDataM ] = useState({});
    const [ blockDataC, setBlockDataC ] = useState({});
    let style = '';

    useEffect(() => {
        if(blockId){
            axios.get(`https://mempool.space/api/block/${blockId}`)
                .then(res => {
                    // console.log(res.data);
                    setBlockDataM(res.data)
                })
                .catch(err => console.log(err))
            axios.get(`https://api.blockcypher.com/v1/btc/main/blocks/${blockId}`)
                .then(res => {
                    // console.log(res.data);
                    setBlockDataC(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [blockId]);

    if(isMobile){
        style = "p-3 col-12"
    } else {
        style = "p-3 col-6";
    }

    return (
        <div className={style} style={{border: '2px solid #CC33CC', borderRadius: '7px', backgroundColor: '#0E0042'}}>
            <BlockDetailsHeader blockData={blockDataM} setSelectedBlock={setSelectedBlock} />
            <BlockDataDisplay blockDataM={blockDataM} blockDataC={blockDataC} />
        </div>
    )
}

export default BlockDetails;