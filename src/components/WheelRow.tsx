import React from "react"
import Ticker from './Ticker'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'


interface WheelRowProps {
    rowNum: number
    currentIndex: number
    rowContent: string
    isSpinning: boolean
    numberOfSpins: number
    winningRow: number
}

const WheelRow = ({ rowNum, currentIndex, rowContent, isSpinning, numberOfSpins, winningRow }: WheelRowProps) => {
    const getItemClassName = (idx: number, rowNumber: (string | number)) => {
        let classNameList = idx === winningRow - 1 && !isSpinning && numberOfSpins > 0 ? `item winner` : 'item'
        classNameList += parseInt(rowNumber.toString()) % 2 === 0 ? ' even' : ' odd'

        return classNameList
    }

    const displayTicker = (row: number) => row === winningRow - 1
        ? <Ticker icon={faCaretRight} />
        : null
        
  return (
    <div className="wheel-row-content">
      <div className="ticker-holder">{displayTicker(currentIndex)}</div>
      <div key={currentIndex} className={getItemClassName(currentIndex, rowNum)}>
        {rowContent}
      </div>
    </div>
  )
}

export default WheelRow
