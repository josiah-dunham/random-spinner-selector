import React from 'react'

import WheelRow from './WheelRow'

import '../lib/styles/Wheel.css'
import { maxWheelLength } from '../helpers/constants'
import { IItems } from '../helpers/types'


interface WheelProps {
    items: IItems[]
    isSpinning: boolean
    numberOfSpins: number
    winningRow: number
}

const Wheel = ({ items, isSpinning, numberOfSpins, winningRow }: WheelProps) => {
    const getWheel = () => {
        let wheelContent = []
        const totalWheelLength = items.length < maxWheelLength ? items.length : maxWheelLength
        for(let w = 0; w < totalWheelLength; w++ ) {
            wheelContent.push(<WheelRow isSpinning={isSpinning} numberOfSpins={numberOfSpins} winningRow={winningRow} rowNum={items[w].position} currentIndex={w} rowContent={items[w].name}/>)
        }
        return wheelContent
    }


        // {items.map((i, idx) => (
        //     <div className="wheel-row-content">
        //         <div className="ticker-holder">
        //             {displayTicker(idx)}
        //         </div>
        //         <div key={idx} className={getItemClassName(idx, itemsByRow[idx][1])}>{i}</div>
        //     </div>
        // ))}

    return (
        <div className="wheel">
           {getWheel().map(row => row)}
        </div>
    )
}

export default Wheel