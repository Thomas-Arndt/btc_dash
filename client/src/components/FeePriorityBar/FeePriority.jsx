import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeeBlock from './FeeBlock';

const FeePriority = () => {
    const [ feePriority, setFeePriority ] = useState([]);

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

    return (
        <div 
            className="d-flex justify-content-between col-6 p-3"
            style={{border: '2px solid #CC33CC'}}>
            {feePriority.map((item, i) => (
                <FeeBlock key={i} feeData={item} />
            ))}
        </div>
    )
}

export default FeePriority;