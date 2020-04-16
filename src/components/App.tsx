import React, { useState, useEffect } from 'react';
import '../lib/styles/App.css';

import { items } from '../helpers/constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [listItems, setListItems] = useState(items)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isSlowingDown, setIsSlowingDown] = useState(false)
  const [slowDownRate, setSlowDownRate] = useState(1)
  const [intervalSpeed, setIntervalSpeed] = useState(100)
  const [winner, setWinner] = useState("")
  const [numberOfSpins, setNumberOfSpins] = useState(0)

  useEffect(() => {
    if(isSpinning) {
      const timer = setInterval(updateWheel, intervalSpeed)

      if(intervalSpeed < 1000) {
        return () => clearInterval(timer)
      }
      clearInterval(timer)
      setIsSpinning(false)
      setIsSlowingDown(false)
      setIntervalSpeed(100)
      setWinner(listItems[4])
      setNumberOfSpins(numberOfSpins + 1)
    }
  }, [listItems])

  const getSpinTimerValue = () => (Math.random() * 1000) + 1000
  const getSpinSlowdownRate = () => (Math.random() * 0.1) + 0.1
  // useEffect(() => {
  //   const timer = setInterval(updateWheel, 100)
  //   return () => clearInterval(timer)
  // }, [listItems])

  const beginSpin = () => {
    const spinTimerValue = getSpinTimerValue()
    const spinSlowdownRate = getSpinSlowdownRate()
    setSlowDownRate(spinSlowdownRate)

    console.log(`Spinning for ${spinTimerValue} ms`)

    setTimeout(() => {
      console.log("Begin slow down...")
      setIsSlowingDown(true)
    }, spinTimerValue)

    setIsSpinning(true)
    updateWheel()
  }

  const toggleSpin = () => {
    const switchSpin = !isSpinning
    if(switchSpin) {
      updateWheel()
    }
    setIsSpinning(switchSpin)
  }

  const updateWheel = () => {
      let itemsCopy = listItems.slice()
      let lastElement = itemsCopy.pop()
      lastElement = lastElement ? lastElement : ""
      itemsCopy.unshift(lastElement)
      if(isSlowingDown) {
        console.log(`Beginning to slow down at rate: ${slowDownRate}`)
        let _intervalSpeed = (intervalSpeed * slowDownRate) + intervalSpeed
        setIntervalSpeed(_intervalSpeed)
      }
      setListItems(itemsCopy)
  }

  const getItemClassName = (idx: number) => (idx === 4 && !isSpinning && numberOfSpins > 0) ? `item winner` : 'item'

  const getStatus = () => {
    let status
    if(isSpinning && !isSlowingDown) {
      status = "Wheel spinning"
    }
    else if(isSlowingDown) {
      status = "Slowing down..."
    }
    else {
      if(numberOfSpins === 0) {
        status = "Spin wheel to select winner!"
      }
      else {
        status = `Winner: ${winner}!`
      }
    }

    return status
  }

  return (
    <div className="App">
      <div className="selector-wrapper">
        <div className="items-wrapper">
          <div className="ticker">
            <FontAwesomeIcon size="2x" icon={faCaretRight} />
          </div>
          <div className="items">
            {listItems.map((i, idx) => (
              <div key={idx} className={getItemClassName(idx)}>{i}</div>
            ))}
          </div>
          <div className="winner-section">
            {getStatus()}
          </div>
        </div>
        <button onClick={() => beginSpin()} className="spin-wheel">Spin!</button>
      </div>
    </div>
  )
}

export default App;
