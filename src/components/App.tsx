import React, { useState, useEffect } from 'react';

import Board from './Board'
import SpinButton from './SpinButton'
import WinnerArea from './WinnerArea'
import { items, winningRow } from '../helpers/constants'
import { WheelStatus, Results } from '../helpers/types'

import '../lib/styles/App.css';


const App = () => {
  const defaultWheelStatus: WheelStatus = {
    isSpinning: false,
    isSlowingDown: false,
    slowDownRate: 1.0,
    intervalSpeed: 100
  }

  const defaultResults: Results = {
    numberOfSpins: 0,
    winners: []
  }

  const [listItems, setListItems] = useState(items)
  const [wheelStatus, setWheelStatus] = useState(defaultWheelStatus)
  const [results, setResults] = useState(defaultResults)

  const getItemsByRows = () => items.map((i: string, idx: number) => {
    return [i, idx + 1]
  })

  const _winningRow = (winningRow < 1 || winningRow > items.length) ? 1 : winningRow
  const winningPosition = _winningRow - 1

  const itemsByRows = getItemsByRows()
  
  useEffect(() => {
    if (wheelStatus.isSpinning) {
      const timer = setInterval(updateWheel, wheelStatus.intervalSpeed)

      if (wheelStatus.intervalSpeed < 1000) {
        return () => clearInterval(timer)
      }
      clearInterval(timer)
      setWheelStatus(defaultWheelStatus)
      const winner = listItems[winningPosition]
      const allWinners = results.winners
      allWinners.push(winner)
      const numberOfSpins = results.numberOfSpins + 1
      setResults({numberOfSpins, winners: allWinners})
    }
  }, [listItems, results])

  const getSpinTimerValue = () => (Math.random() * 1000) + 1000
  const getSpinSlowdownRate = () => (Math.random() * 0.1) + 0.1

  const beginSpin = () => {
    const spinTimerValue = getSpinTimerValue()
    const spinSlowdownRate = getSpinSlowdownRate()

    setTimeout(() => {
      console.log("Begin slow down...")
      setWheelStatus({...wheelStatus, isSpinning: true, isSlowingDown: true, slowDownRate: spinSlowdownRate})
    }, spinTimerValue)

    setWheelStatus({...wheelStatus, isSpinning: true})
    updateWheel()
  }

  const toggleSpin = () => {
    const switchSpin = !wheelStatus.isSpinning
    if (switchSpin) {
      updateWheel()
    }
    setWheelStatus({...wheelStatus, isSpinning: switchSpin})
  }

  const updateWheel = () => {
    let itemsCopy = listItems.slice()
    let lastElement = itemsCopy.pop()
    lastElement = lastElement ? lastElement : ""
    itemsCopy.unshift(lastElement)
    if (wheelStatus.isSlowingDown) {
      console.log(`Beginning to slow down at rate: ${wheelStatus.slowDownRate}`)
      let _intervalSpeed = (wheelStatus.intervalSpeed * wheelStatus.slowDownRate) + wheelStatus.intervalSpeed
      setWheelStatus({...wheelStatus, intervalSpeed: _intervalSpeed})
    }
    
    setListItems(itemsCopy)
  }

  return (
    <div className="App">
      <div className="selector-wrapper">
        <Board items={listItems} wheelStatus={wheelStatus} results={results} winningRow={_winningRow} spin={beginSpin} itemsByRow={itemsByRows}/>
      </div>
    </div>
  )
}

export default App;
