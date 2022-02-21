import React, { useState, useEffect } from 'react';
import BlockSphere from './BlockSphere';
import TransactionSphere from './TransactionSphere';

const HorizontalScroll = (props) => {
    const { blocks, pending, transactions, loadTransactions, selectBlock, selectedBlock, setSelectedTransaction, selectedTransaction } = props;
    const [ selectLockout, setSelectLockout ] = useState(false);
    const [ scrollLock, setScrollLock ] = useState(false);
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ clientX, setClientX ] = useState(0);
    const [ scrollX, setScrollX ] = useState(0);
    const wrapper = React.createRef();
    const loadPoint = React.createRef();
    const endPoint = React.createRef();
    const viewport = React.createRef();
    const leftBlock = React.createRef();
    let scrollWheel = 0;

    useEffect(() => {
        if(blocks){
            wrapper.current.scrollLeft = document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2);
            setScrollX(document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2));
        }
        if(transactions){
            wrapper.current.scrollLeft = 0;
            setScrollX(0);
        }
    }, [selectedBlock, selectedTransaction, blocks]);

    const reachLoadPoint = () => {
        if(transactions && ((loadPoint.current.offsetLeft+leftBlock.current.offsetWidth)-(scrollX+viewport.current.offsetWidth))<0){
            loadTransactions();
        }
    }

    const onPointerDown = (e) => {
        setIsScrolling(true);
        setClientX(e.clientX);
        onPointerMove();
        setSelectLockout(false);
    }
    
    const onPointerUp = (e) => {
        setIsScrolling(false);
        scrollX < 0 && setScrollX(0);
        wrapper.current.scrollLeft <= 0 && (wrapper.current.scrollLeft = 0);

    }
    
    const onPointerMove = (e) => {
        reachLoadPoint();
        if(isScrolling){
            setSelectLockout(true);
            const eventClientX = e.clientX;
            wrapper.current.scrollLeft = scrollX + eventClientX - clientX;
            scrollX - (eventClientX - clientX) >= 0 ?
                setScrollX(scrollX - (eventClientX - clientX)) :
                setScrollX(0);
            setClientX(eventClientX);
        }
    }

    const onWheelMove = (e) => {
        reachLoadPoint();
        if(blocks && ((endPoint.current.offsetLeft+leftBlock.current.offsetWidth)-(scrollX+viewport.current.offsetWidth))<0){
            // do something to stop scrolling
        }
        if(!scrollLock){
            const scrollSpeed = 0.5;
            if(scrollX + e.deltaY*scrollSpeed > 0){
                scrollWheel+=(e.deltaY*scrollSpeed);
                wrapper.current.scrollLeft = scrollX + scrollWheel;
                setScrollX(scrollX + scrollWheel);
            }
            else{
                wrapper.current.scrollLeft = 0;
                setScrollX(0);
            }
        }
    }

    return (
        <div 
            ref={viewport}
            className="d-flex flex-column position-relative w-100">
            <div
                ref={wrapper}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerUp}
                onWheel={onWheelMove}
                className="d-flex w-100 overflow-auto mx-auto py-3"
                style={{backgroundColor: '#0E0042', height: 'fit-content', touchAction: 'none'}}>
                <div
                    ref={leftBlock}
                    className="d-flex px-1">
                    {pending && pending.map((block, i) =>
                        <BlockSphere key={i} 
                            blockData={block}
                            blockStyle={{color: '#777777', align: 'end'}}
                            lockout={selectLockout} />
                    )}
                </div>
                {pending && <div style={{borderRight: '2px dotted white'}}></div>}
                <div id="rightBlock" className="d-flex px-2 position-relative">
                    {blocks && 
                        <div style={{display: 'flex'}}>
                            <div style={{borderBottom: '2px solid white', height: '1px', width: '90%', position: 'absolute', top: '50%', left: '20px', zIndex: '0'}}></div>
                            <div style={{borderBottom: '5px dotted white', height: '1px', width: '10%', position: 'absolute', top: '50%', right: '-10px', zIndex: '0'}}></div>
                        </div>}
                    {blocks && blocks.map((block, i) =>
                        <BlockSphere key={i} 
                            blockData={block} 
                            blockStyle={{color: '#FF6600', align: 'end'}}
                            lockout={selectLockout}
                            selectBlock={selectBlock}
                            setSelectedTransaction={setSelectedTransaction} />
                            )}
                    {blocks && <div ref={endPoint} style={{color: 'white'}}></div>}
                </div>
                <div
                    className="d-flex px-2 position-relative">
                    {transactions && !selectedTransaction && <div style={{position: 'absolute', top: '50%', borderBottom: '2px dotted white', height: '1px', width: '95%', marginLeft: '25px', zIndex: '0'}}></div>}
                    {transactions && transactions.map((txn, i) =>
                        <TransactionSphere key={i} 
                            transactionId={txn} 
                            blockStyle={{color: '#FF6600', align: 'center'}}
                            lockout={selectLockout}
                            selectedBlock={selectedBlock}
                            selectedTransaction={selectedTransaction}
                            setScrollLock={setScrollLock}
                            scrollLock={scrollLock} />
                        )}
                    {transactions && <div ref={loadPoint} style={{color: 'white'}}></div>}
                </div>
            </div>
            <div
                className="position-absolute w-100"
                style={{backgroundColor: "#0E0042", height: "20px", bottom: 0, zIndex: 1}}>
            </div>
        </div>
    )
}

export default HorizontalScroll;