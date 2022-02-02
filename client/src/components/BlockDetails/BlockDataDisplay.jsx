import React from 'react';

const BlockDataDisplay = (props) => {
    const { blockDataM, blockDataC } = props;

    const copyToClipboard = (e) => {
        console.log(e.target.innerText);
        navigator.clipboard.writeText(e.target.innerText);
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    return (
        <div>
            <div className="d-flex align-items-end w-100 my-2">
                <h6 className="m-0" style={{color: '#FF6600'}}>HASH</h6>
                <div className="w-100 mb-1" 
                    style={{borderBottom: '2px dotted white'}}></div>
                <p 
                    onClick={copyToClipboard}
                    className="text-white m-0 text-wrap" 
                    style={{fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: '75%', cursor: 'pointer'}}>
                        {blockDataM.id}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>TIMESTAMP</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>{new Date(blockDataM.timestamp*1000).toLocaleString()}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>SIZE</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>{roundTo((blockDataM.size/1024/1024),2)} MB</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>WEIGHT</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>{roundTo((blockDataM.weight/1000000),2)} MWU</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0 text-nowrap" style={{color: '#FF6600'}}>AVERAGE FEE</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>~{roundTo((blockDataC.fees/blockDataC.n_tx/140),0)} sat/vB</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0 text-nowrap" style={{color: '#FF6600'}}>TOTAL FEES</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>{roundTo((blockDataC.fees/100000000),2)} BTC</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>REWARD</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-nowrap" style={{fontSize: '12px'}}>{roundTo((blockDataC.fees/100000000+6.25),2)} BTC</p>
            </div>
        </div>
    )
}

export default BlockDataDisplay;