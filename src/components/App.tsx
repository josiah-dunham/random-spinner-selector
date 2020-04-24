import React, { useState, useEffect } from 'react';

import Board from './Board'
import SpinButton from './SpinButton'
import WinnerArea from './WinnerArea'
import WinnerModal from './WinnerModal'
import { items, winningRow } from '../helpers/constants'
import { WheelStatus, Results, IItems } from '../helpers/types'

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

  const getItemsByRows = (): IItems[] => items.map((i: string, idx: number) => {
    return {
      name: i,
      position: idx + 1
    }
  })

  const [listItems, setListItems] = useState(getItemsByRows())
  const [wheelStatus, setWheelStatus] = useState(defaultWheelStatus)
  const [results, setResults] = useState(defaultResults)

  const [winner, setWinner] = useState("")

  const [modalShow, setModalShow] = useState(false);

  const _winningRow = (winningRow < 1 || winningRow > items.length) ? 1 : winningRow
  const winningPosition = _winningRow - 1

  const itemsByRows = getItemsByRows()
  
  useEffect(() => {
    if (wheelStatus.isSpinning) {
      const timer = setInterval(updateWheel, wheelStatus.intervalSpeed)

      if (wheelStatus.intervalSpeed < 925) {
        return () => clearInterval(timer)
      }
      clearInterval(timer)
      setWheelStatus(defaultWheelStatus)
      const _winner = listItems[winningPosition].name
      const allWinners = results.winners
      allWinners.push(_winner)
      const numberOfSpins = results.numberOfSpins + 1
      setWinner(_winner)
      setResults({numberOfSpins, winners: allWinners})
      showWinnerModal()
    }
  }, [listItems, results, winner, modalShow])

  const getSpinTimerValue = () => (Math.random() * 3000) + 5000
  const getSpinSlowdownRate = () => (Math.random() * 0.15) + 0.05

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
    lastElement = lastElement ? lastElement : {name: "", position: -1}
    itemsCopy.unshift(lastElement)
    if (wheelStatus.isSlowingDown) {
      console.log(`Beginning to slow down at rate: ${wheelStatus.slowDownRate}`)
      let _intervalSpeed = (wheelStatus.intervalSpeed * wheelStatus.slowDownRate) + wheelStatus.intervalSpeed
      setWheelStatus({...wheelStatus, intervalSpeed: _intervalSpeed})
    }
    
    setListItems(itemsCopy)
  }

  console.log(itemsByRows)

  const showWinnerModal = () => setTimeout(() => setModalShow(true), 2000)

  return (
    <div className="App">
      <div className="app-header">
        <h1>Vantage Point Trivia!</h1>
      </div>
      <div className="selector-wrapper">
        <Board items={listItems} wheelStatus={wheelStatus} results={results} winningRow={_winningRow} spin={beginSpin} />
      </div>
      <WinnerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        winner={winner}
      />
    </div>
  )
}

export default App;
