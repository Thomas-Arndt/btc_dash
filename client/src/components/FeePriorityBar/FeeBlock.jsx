import React from 'react';

const FeeBlock = (props) => {
    const { feeData } = props;
    return (
        <div className="d-flex flex-column">
            <div className="d-flex align-items-end gap-1">
                <h2 className="m-0" style={{color: '#CC33CC'}}>{feeData.fee}</h2>
                <div className="d-flex flex-column">
                    <p className="m-0" style={{color: '#CC33CC', borderBottom: '1px solid #CC33CC', fontSize: '10px'}}>sat</p>
                    <p className="m-0" style={{color: '#CC33CC', fontSize: '10px'}}>vB</p>
                </div>
                {feeData.priority === "minimumFee" && <p className="m-0 text-white">min</p>}
                {feeData.priority === "hourFee" && <p className="m-0 text-white">slow</p>}
                {feeData.priority === "halfHourFee" && <p className="m-0 text-white">mid</p>}
                {feeData.priority === "fastestFee" && <p className="m-0 text-white">fast</p>}
            </div>
            <div className="d-flex align-items-start justify-content-center">
                <p className="m-0" style={{color: '#CC33CC'}}>($0.00)</p>
                {/* {feeData.priority === "minimumFee" ? <p className="m-0 text-white">fee</p> : <p className="m-0 text-white">fee</p>} */}
            </div>
        </div>
    )
}

export default FeeBlock;    