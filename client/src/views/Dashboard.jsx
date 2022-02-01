import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
import NavBar from '../components/NavBar/NavBar';
import FeePriority from '../components/FeePriorityBar/FeePriority';
import BlockDetails from './BlockDetails';
import TransactionDetails from './TransactionDetails';
import ConversionCalculator from '../components/Converter/ConversionCalculator';

const Dashboard = () => {
    const [ blocks, setBlocks ] = useState([]);
    const [ pending, setPending ] = useState([]);
    const [ selectedBlock, setSelectedBlock ] = useState('');

    useEffect(() => {
        axios.get('https://mempool.space/api/blocks/')
            .then(res => {
                // console.log(res.data);
                setBlocks(res.data)
                setSelectedBlock(res.data[0].id)
            })
            .catch(err => console.log(err))
        axios.get('https://mempool.space/api/v1/fees/mempool-blocks')
            .then(res => {
                // console.log(res.data);
                setPending(res.data.reverse());
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex flex-column w-100">
            <NavBar/>
            <HorizontalScroll blocks={blocks} pending={pending} selectBlock={setSelectedBlock} />
            <div 
                className="d-flex gap-3 px-3"
                style={{backgroundColor: '#0E0042'}}>
                <FeePriority />
                <ConversionCalculator />
            </div>
            <div 
                className="d-flex gap-3 p-3"
                style={{backgroundColor: '#0E0042'}}>
                <BlockDetails blockId={selectedBlock} setSelectedBlock={setSelectedBlock} />
                <TransactionDetails blockId={selectedBlock}/>
            </div>
            <p className="text-white">{selectedBlock}</p>
        </div>
    )
}

export default Dashboard;