import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import FeeBlock from './FeeBlock';

const FeePriority = () => {
    const [ feePriority, setFeePriority ] = useState([]);
    let style = '';

    useEffect(() => {
        axios.get('https://mempool.space/api/v1/fees/recommended')
            .then(res => {
                let feeList = [];
                // console.log(res.data);
                for(const key in res.data){
                    feeList.push({priority: key, fee: res.data[key]})
                }
                setFeePriority(feeList.reverse());
            })
            .catch(err => console.log(err))
    }, []);

    if(isMobile){
        style = "d-flex justify-content-between p-3"
    } else {
        style = "d-flex justify-content-between p-3 col-6";
    }

    return (
        <div 
            className={style}
            style={{border: '2px solid #CC33CC', borderRadius: '7px', overflowX: 'hidden'}}>
            {feePriority.map((item, i) => (
                <FeeBlock key={i} feeData={item} />
            ))}
        </div>
    )
}

export default FeePriority;