import React, { useState, useEffect } from 'react';
import BlockSphere from './BlockSphere';
import TransactionSphere from './TransactionSphere';

const HorizontalScroll = (props) => {
    const { blocks, pending, transactions, selectBlock } = props;
    const ref = React.createRef();
    const [ selectLockout, setSelectLockout ] = useState(false);
    const [ scrollLock, setScrollLock ] = useState(false);
    const [ isScrolling, setIsScrolling ] = useState(false);
    const [ clientX, setClientX ] = useState(0);
    const [ scrollX, setScrollX ] = useState(0);
    let scrollWheel = 0;

    useEffect(() => {
        if(blocks){
            ref.current.scrollLeft = document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2);
            setScrollX(document.getElementById('rightBlock').offsetLeft-(window.innerWidth/2));
        }
        if(transactions){
            ref.current.scrollLeft = 0;
            setScrollX(0);
        }
    }, []);

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
        if(!scrollLock){
            const scrollSpeed = 0.5;
            // && ref.current.scrollLeft+window.innerWidth < ref.current.scrollWidth
            if(scrollX + e.deltaY*scrollSpeed > 0){
                scrollWheel+=(e.deltaY*scrollSpeed);
                ref.current.scrollLeft = scrollX + scrollWheel;
                setScrollX(scrollX + scrollWheel);
                // console.log(`scrollWidth: ${ref.current.scrollWidth} | scrollLeft: ${ref.current.scrollLeft}`);
            }
            // else if(ref.current.scrollLeft+window.innerWidth === ref.current.scrollWidth && e.deltaY > 0){
            //     ref.current.scrollLeft = ref.current.scrollWidth;
            //     setScrollX(ref.current.scrollWidth);
            // }
            else{
                ref.current.scrollLeft = 0;
                setScrollX(0);
            }
        }
    }

    return (
        <div 
            className="d-flex flex-column position-relative">
            <div
                ref={ref}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerUp}
                onWheel={onWheelMove}
                className="d-flex w-100 overflow-auto mx-auto py-3"
                style={{backgroundColor: '#0E0042', height: 'fit-content', touchAction: 'none'}}>
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
                            selectBlock={selectBlock}
                            setScrollLock={setScrollLock}
                            scrollLock={scrollLock} />
                    )}
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