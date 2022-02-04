import React from 'react';
import styles from './BlockDataDisplay.module.css';

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
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>HASH</h6>
                <div className={styles.dottedLine}></div>
                <p 
                    onClick={copyToClipboard}
                    className={styles.hashText}>
                        {blockDataM.id}</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>TIMESTAMP</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{new Date(blockDataM.timestamp*1000).toLocaleString()}</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>TRANSACTIONS</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{blockDataM.tx_count}</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>SIZE</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{roundTo((blockDataM.size/1024/1024),2)} MB</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>WEIGHT</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{roundTo((blockDataM.weight/1000000),2)} MWU</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>AVERAGE FEE</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>~{roundTo((blockDataC.fees/blockDataC.n_tx/140),0)} sat/vB</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>TOTAL FEES</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{roundTo((blockDataC.fees/100000000),2)} BTC</p>
            </div>
            <div className={styles.dataRow}>
                <h6 className={styles.dataLabel}>REWARD</h6>
                <div className={styles.dottedLine}></div>
                <p className={styles.dataText}>{roundTo((blockDataC.fees/100000000+6.25),2)} BTC</p>
            </div>
        </div>
    )
}

export default BlockDataDisplay;