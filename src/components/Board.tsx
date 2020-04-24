import React from 'react'

import { WheelStatus, Results } from '../helpers/types'

import Wheel from './Wheel'
import WinnerArea from './WinnerArea'
import SpinButton from './SpinButton'

interface BoardProps {
    items: string[]
    wheelStatus: WheelStatus,
    results: Results
    winningRow: number
    spin: () => void
    itemsByRow: (string | number)[][]
}

const Board = ({ items, wheelStatus, results, winningRow, spin, itemsByRow}: BoardProps) => {
    const { isSpinning } = wheelStatus
    const { numberOfSpins } = results

    return (
        <div className="board">
            <Wheel items={items} isSpinning={isSpinning} numberOfSpins={numberOfSpins} winningRow={winningRow} itemsByRow={itemsByRow}/>
            <WinnerArea wheelStatus={wheelStatus} results={results} />
            <SpinButton spin={spin}/>
        </div>
    )
}

export default Board