import React from "react"

import { WheelStatus, Results, IItems } from "../helpers/types"

import Wheel from "./Wheel"
import WinnerArea from "./WinnerArea"
import SpinButton from "./SpinButton"
import ItemInput from './ItemInput'

interface BoardProps {
  items: IItems[]
  wheelStatus: WheelStatus
  results: Results
  winningRow: number
  spin: () => void
  addNames: (e: any) => void
  clearAllNames: () => void
}

const Board = ({
  items,
  wheelStatus,
  results,
  winningRow,
  spin,
  addNames,
  clearAllNames
}: BoardProps) => {
  const { isSpinning } = wheelStatus
  const { numberOfSpins } = results

  return (
    <div className="board">
      <Wheel
        items={items}
        isSpinning={isSpinning}
        numberOfSpins={numberOfSpins}
        winningRow={winningRow}
      />
      <div className="other-area">
        <WinnerArea wheelStatus={wheelStatus} results={results} />
        <SpinButton spin={spin} />
        <ItemInput addNames={addNames} items={items} clearAllNames={clearAllNames} />
      </div>
    </div>
  )
}

export default Board
