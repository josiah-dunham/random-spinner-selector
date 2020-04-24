import React from 'react'

import { WheelStatus, Results } from '../helpers/types'


interface WinnerAreaProps {
    results: Results
    wheelStatus: WheelStatus,
}

const WinnerArea = ({ results, wheelStatus }: WinnerAreaProps) => {
    const { isSpinning, isSlowingDown } = wheelStatus
    const { numberOfSpins, winners } = results

    const getWinner = () => winners[winners.length - 1]

    const getStatus = () => {
        let status
        if (isSpinning && !isSlowingDown) {
            status = "Wheel spinning"
        }
        else if (isSlowingDown) {
            status = "Slowing down..."
        }
        else {
            if (numberOfSpins === 0) {
                status = "Spin wheel to select winner!"
            }
            else {
                status = `Winner: ${getWinner()}!`
                console.log(winners)
            }
        }

        return status
    }
    return (
        <div className="winner-section">
            <div className="winner-status">
                {getStatus()}
            </div>
        </div>
    )
}

export default WinnerArea
