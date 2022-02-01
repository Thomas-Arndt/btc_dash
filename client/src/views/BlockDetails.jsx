import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockDetailsHeader from '../components/BlockDetails/BlockDetailsHeader';
import BlockDataDisplay from '../components/BlockDetails/BlockDataDisplay';

const BlockDetails = (props) => {
    const { blockId, setSelectedBlock } = props;
    const [ blockData, setBlockData ] = useState({});

    useEffect(() => {
        if(blockId){
            axios.get(`https://mempool.space/api/block/${blockId}`)
                .then(res => {
                    // console.log(res.data);
                    setBlockData(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [blockId]);

    return (
        <div className="p-3 col-6" style={{border: '2px solid #CC33CC'}}>
            <BlockDetailsHeader blockData={blockData} setSelectedBlock={setSelectedBlock} />
            <BlockDataDisplay blockData={blockData} />
        </div>
    )
}

export default BlockDetails;