import React, { useState, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import axios from 'axios';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll';
import NavBar from '../components/NavBar/NavBar';
import FeePriority from '../components/FeePriorityBar/FeePriority';
import BlockDetails from './BlockDetails';
import TransactionDetails from './TransactionDetails';
import ConversionCalculator from '../components/Converter/ConversionCalculator';
import SearchBar from '../components/NavBar/SearchBar';

const Dashboard = () => {
    const [ blocks, setBlocks ] = useState([]);
    const [ pending, setPending ] = useState([]);
    const [ selectedBlock, setSelectedBlock ] = useState('');

    useEffect(() => {
        axios.get('https://mempool.space/api/v1/fees/mempool-blocks')
            .then(res => {
                // console.log(res.data);
                // let tempPending = res.data.splice(0,3)
                setPending(res.data.reverse());
            })
            .catch(err => console.log(err))
        axios.get('https://mempool.space/api/blocks/')
            .then(res => {
                // console.log(res.data);
                setBlocks(res.data)
                setSelectedBlock(res.data[0].id)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex flex-column w-100" style={{backgroundColor: '#0E0042'}}>
            <BrowserView>
                <NavBar setSelectedBlock={setSelectedBlock} />
                <HorizontalScroll blocks={blocks} pending={pending} selectBlock={setSelectedBlock} />
                <div 
                    className="d-flex gap-3 px-3">
                    <FeePriority />
                    <ConversionCalculator />
                </div>
                <div 
                    className="d-flex gap-3 p-3">
                    <BlockDetails blockId={selectedBlock} setSelectedBlock={setSelectedBlock} />
                    <TransactionDetails blockId={selectedBlock}/>
                </div>
            </BrowserView>
            <MobileView>
                <div className="d-flex flex-column gap-3 w-100">
                    <NavBar />
                    <div className="d-flex flex-column gap-3 w-100 px-3">
                        <SearchBar setSelectedBlock={setSelectedBlock} />
                        <FeePriority />
                        <ConversionCalculator />
                    </div>
                    <HorizontalScroll blocks={blocks} pending={pending} selectBlock={setSelectedBlock} />
                    <div className="d-flex flex-column gap-3 w-100 px-3">
                        <BlockDetails blockId={selectedBlock} setSelectedBlock={setSelectedBlock} />
                        <TransactionDetails blockId={selectedBlock}/>
                    </div>
                </div>
            </MobileView>
        </div>
    )
}

export default Dashboard;