import React, { useState, useEffect } from 'react';
import BlockSphere from './BlockSphere';
import TransactionSphere from './TransactionSphere';

const HorizontalScroll = (props) => {
    const { blocks, pending, transactions, selectBlock } = props;
    const ref = React.createRef();
    const [ selectLockout, setSelectLockout ] = useState(false);
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ clientX, setClientX ] = useState(0);
    const [ scrollX, setScrollX ] = useState(0);
    let scrollWheel = 0; 

    // useEffect(() => {
    //     document.getElementById('hScroll').scroll({
    //         left: document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2)
    //     });
    //     setScrollX(document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2))
    // }, []);

    const onPointerDown = (e) => {
        setIsScrolling(true);
        setClientX(e.clientX);
        onPointerMove();
        setSelectLockout(false);
    }
    
    const onPointerUp = (e) => {
        setIsScrolling(false);
        scrollX < 0 && setScrollX(0);
        ref.current.scrollLeft <= 0 && (ref.current.scrollLeft = 0);

    }
    
    const onPointerMove = (e) => {
        if(isScrolling){
            setSelectLockout(true);
            const eventClientX = e.clientX;
            ref.current.scrollLeft = scrollX + eventClientX - clientX;
            scrollX - (eventClientX - clientX) >= 0 ?
                setScrollX(scrollX - (eventClientX - clientX)) :
                setScrollX(0);
            setClientX(eventClientX);
        }
    }

    const onWheelMove = (e) => {
        const scrollSpeed = 0.5;
        if(scrollX + e.deltaY*scrollSpeed > 0){
            scrollWheel+=(e.deltaY*scrollSpeed);
            ref.current.scrollLeft = scrollX + scrollWheel;
            setScrollX(scrollX + scrollWheel);
        }
        else{
            ref.current.scrollLeft = 0;
            setScrollX(0);
        }
    }

    return (
        <div 
            className="d-flex flex-column position-relative">
            <div
                ref={ref}
                id="hScroll"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerUp}
                onWheel={onWheelMove}
                className="d-flex w-100 overflow-auto mx-auto pt-3"
                style={{backgroundColor: '#0E0042', height: 'fit-content'}}>
                <div
                    className="d-flex px-1">
                    {pending && pending.map((block, i) =>
                        <BlockSphere key={i} 
                            blockData={block}
                            blockStyle={{color: '#777777', align: 'end'}}
                            lockout={selectLockout} />
                    )};
                </div>
                {pending && <div style={{borderRight: '2px dotted white'}}></div>}
                <div id="rightBlock" className="d-flex px-2 position-relative">
                    {blocks && <div style={{position: 'absolute', top: '50%', borderBottom: '2px solid white', height: '1px', width: '95%', marginLeft: '25px', zIndex: '0'}}></div>}
                    {blocks && blocks.map((block, i) =>
                        <BlockSphere key={i} 
                            blockData={block} 
                            blockStyle={{color: '#FF6600', align: 'end'}}
                            lockout={selectLockout}
                            selectBlock={selectBlock} />
                    )};
                </div>
                <div className="d-flex px-2 position-relative">
                    {transactions && <div style={{position: 'absolute', top: '50%', borderBottom: '2px dashed white', height: '1px', width: '95%', marginLeft: '25px', zIndex: '0'}}></div>}
                    {transactions && transactions.map((txn, i) =>
                        <TransactionSphere key={i} 
                            transactionId={txn} 
                            blockStyle={{color: '#FF6600', align: 'center'}}
                            lockout={selectLockout}
                            selectBlock={selectBlock} />
                    )}
                </div>
            </div>
            <div
                className="position-absolute w-100"
                style={{backgroundColor: "#0E0042", height: "20px", bottom: 0}}>
            </div>
        </div>
    )
}

export default HorizontalScroll;