import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const ConversionCalculator = () => {
    const [ price, setPrice ] = useState(0);
    const [ btc, setBtc ] = useState('');
    const [ usd, setUsd ] = useState('');
    const [ denomination, setDenomination ] = useState(1);
    let style = "";

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`)
            .then(res => {
                // console.log(res.data[0].current_price);
                setPrice(res.data[0].current_price);
            })
            .catch(err => console.log(err))
    }, []);

    const handleChange = (e) => {
        if(e.target.name==="btc"){
            setBtc(e.target.value)
            setUsd(roundTo(((e.target.value/denomination) * price),2))
        }
        if(e.target.name==='denomination'){
            setDenomination(e.target.value);
            setBtc('');
            setUsd('');
        }
        if(e.target.name==='usd'){
            setUsd(e.target.value);
            setBtc(roundTo(((e.target.value/price)*denomination),8))
        }
    }

    const  roundTo = (number, place) => {
        var multiplier = Math.pow(10, place);
        return Math.round(number*multiplier)/multiplier;
    }

    if(isMobile){
        style = "d-flex align-items-center"
    } else {
        style = "d-flex align-items-center w-100";
    }

    return (
        <div style={{border: '2px solid #CC33CC', borderRadius: '7px'}} className={style}>
            <form className="d-flex justify-content-between gap-2 p-3">
                <div className="d-flex align-items-center gap-1">
                    <input 
                        type="number" 
                        name="btc"
                        value={btc}
                        onChange={handleChange}
                        placeholder="0.00000000" 
                        style={{border: '2px solid #FF6600', borderRadius: '5px', height: '40px', fontSize: '14px'}}
                        className="col-9 text-center px-1" />
                    <h2 style={{margin: 0, color: '#FF6600', fontSize: '20px'}}>BTC</h2>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FF6600" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                <div
                    style={{width: 'fit-content'}}
                    className="d-flex align-items-center gap-1">
                    <h2 style={{margin: 0, color: 'green'}}>$</h2>
                    <input 
                        type="number" 
                        name="usd"
                        value={usd}
                        onChange={handleChange}
                        placeholder="0.00"
                        style={{border: '2px solid #FF6600', borderRadius: '5px', height: '40px', fontSize: '14px'}}
                        className="col-10 text-center" />
                </div>
            </form>
        </div>
    )
}

export default ConversionCalculator;