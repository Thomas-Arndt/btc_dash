import React from 'react';

const BlockDataDisplay = (props) => {
    const { blockData } = props;
    return (
        <div>
            <div className="d-flex align-items-end w-100 my-2">
                <h6 className="m-0" style={{color: '#FF6600'}}>HASH</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0 text-wrap" style={{fontSize: '9.5px'}}>{blockData.id}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>TIMESTAMP</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>{blockData.timestamp}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>SIZE</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>{blockData.size}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>WEIGHT</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>{blockData.weight}</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0 text-nowrap" style={{color: '#FF6600'}}>AVERAGE FEE</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>TBA</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0 text-nowrap" style={{color: '#FF6600'}}>TOTAL FEES</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>TBA</p>
            </div>
            <div className="d-flex align-items-end w-100 mb-2 gap-1">
                <h6 className="m-0" style={{color: '#FF6600'}}>REWARD</h6>
                <div className="w-100 mb-1" style={{borderBottom: '2px dotted white'}}></div>
                <p className="text-white m-0" style={{fontSize: '12px'}}>TBA</p>
            </div>
        </div>
    )
}

export default BlockDataDisplay;