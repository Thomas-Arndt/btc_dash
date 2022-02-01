import React from 'react';

const ConversionCalculator = () => {
    return (
        <div style={{border: '2px solid #CC33CC'}} className="d-flex align-items-center w-100">
            <form className="d-flex justify-content-between gap-1 p-3">
                <div className="d-flex align-items-center gap-1">
                    <input 
                        type="number" 
                        placeholder="0.0" 
                        style={{border: '2px solid #FF6600', borderRadius: '5px', height: '40px', fontSize: '30px'}}
                        className="col-8 text-center px-1" />
                    <select
                        style={{backgroundColor: '#FF6600', border: 'none', fontWeight: 'bold', color: 'white'}} 
                        className="form-control py-0">
                        <option value="BTC">BTC</option>
                        <option value="sat">sat</option>
                    </select>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FF6600" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                <div className="d-flex align-items-center gap-1">
                    <h2 style={{margin: 0, color: 'green'}}>$</h2>
                    <input 
                        type="number" 
                        placeholder="0.00"
                        style={{border: '2px solid #FF6600', borderRadius: '5px', height: '40px', fontSize: '30px'}}
                        className="w-100 text-center" />
                </div>
            </form>
        </div>
    )
}

export default ConversionCalculator;