import React from 'react'

import '../lib/styles/Wheel.css'
import Ticker from './Ticker'

import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

interface WheelProps {
    items: string[]
    isSpinning: boolean
    numberOfSpins: number
    winningRow: number
    itemsByRow: (string | number)[][]
}

const Wheel = ({ items, isSpinning, numberOfSpins, winningRow, itemsByRow }: WheelProps) => {
    const getItemClassName = (idx: number, rowNumber: (string | number)) => {
        let classNameList = idx === winningRow - 1 && !isSpinning && numberOfSpins > 0 ? `item winner` : 'item'
        classNameList += parseInt(rowNumber.toString()) % 2 === 0 ? ' even' : ' odd'

        return classNameList
    }

    const displayTicker = (row: number) => row === winningRow - 1
        ? <Ticker icon={faCaretRight} />
        : null

    return (
        <div className="wheel">
            {items.map((i, idx) => (
                <div className="wheel-row-content">
                    <div className="ticker-holder">
                        {displayTicker(idx)}
                    </div>
                    <div key={idx} className={getItemClassName(idx, itemsByRow[idx][1])}>{i}</div>
                </div>
            ))}
        </div>
    )
}

export default Wheel