import React, { useState, useEffect } from "react"

import Board from "./Board"
import SpinButton from "./SpinButton"
import WinnerArea from "./WinnerArea"
import WinnerModal from "./WinnerModal"
import { items, maxWheelLength, localStorageKey } from "../helpers/constants"
import { WheelStatus, Results, IItems } from "../helpers/types"

import "../lib/styles/App.css"

const App = () => {
  const defaultWheelStatus: WheelStatus = {
    isSpinning: false,
    isSlowingDown: false,
    slowDownRate: 1.0,
    intervalSpeed: 100,
  }

  const defaultResults: Results = {
    numberOfSpins: 0,
    winners: [],
  }

  const getItemsByRows = (items: string[]): IItems[] =>
    items.map((i: string, idx: number) => {
      return {
        name: i,
        position: idx + 1,
      }
    })

  const defaultItems: IItems = {
    name: "",
    position: -1,
  }

  const setLocalStorage = (key: string, value: any) =>
    window.localStorage.setItem(key, value)
  const getLocalStorage: any = (key: string) => window.localStorage.getItem(key)

  const allItems: IItems[] = !!getLocalStorage(localStorageKey)
    ? (JSON.parse(getLocalStorage(localStorageKey)) as IItems[])
    : [defaultItems]

  const [listItems, setListItems] = useState(allItems)
  const [wheelStatus, setWheelStatus] = useState(defaultWheelStatus)
  const [results, setResults] = useState(defaultResults)

  const [winner, setWinner] = useState("")

  const [modalShow, setModalShow] = useState(false)

  const _winningRow =
    listItems.length > maxWheelLength
      ? Math.floor(maxWheelLength / 2)
      : Math.floor(listItems.length / 2)

  const winningRow = _winningRow < 1 ? 1 : _winningRow
  const winningPosition = winningRow - 1

  // const itemsByRows = getItemsByRows()

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
      setResults({ numberOfSpins, winners: allWinners })
      showWinnerModal()
    }
  }, [listItems])

  const getSpinTimerValue = () => Math.random() * 3000 + 5000
  const getSpinSlowdownRate = () => Math.random() * (0.14 - 0.07) + 0.07

  const beginSpin = () => {
    // const itemsFixed = listItems
    //   .slice()
    //   .filter((i: IItems) => i.name !== "")
    //   .map((i: IItems, idx: number) => {
    //     return {
    //       name: i.name,
    //       position: idx + 1,
    //     }
    //   })
    // console.log(itemsFixed)
    const spinTimerValue = getSpinTimerValue()
    const spinSlowdownRate = getSpinSlowdownRate()

    setTimeout(() => {
      console.log("Begin slow down...")
      setWheelStatus({
        ...wheelStatus,
        isSpinning: true,
        isSlowingDown: true,
        slowDownRate: spinSlowdownRate,
      })
    }, spinTimerValue)

    setWheelStatus({ ...wheelStatus, isSpinning: true })
    updateWheel()
  }

  const toggleSpin = () => {
    const switchSpin = !wheelStatus.isSpinning
    if (switchSpin) {
      updateWheel()
    }
    setWheelStatus({ ...wheelStatus, isSpinning: switchSpin })
  }

  const updateWheel = (allItems?: IItems[]) => {
    const _items = !!allItems ? allItems : listItems
    let itemsCopy = _items.slice()
    let lastElement = itemsCopy.pop()
    lastElement = lastElement ? lastElement : { name: "", position: -1 }
    itemsCopy.unshift(lastElement)
    if (wheelStatus.isSlowingDown) {
      console.log(`Beginning to slow down at rate: ${wheelStatus.slowDownRate}`)
      let _intervalSpeed =
        wheelStatus.intervalSpeed * wheelStatus.slowDownRate +
        wheelStatus.intervalSpeed
      setWheelStatus({ ...wheelStatus, intervalSpeed: _intervalSpeed })
    }

    setListItems(itemsCopy)
  }

  const showWinnerModal = () => setTimeout(() => setModalShow(true), 2000)

  const clearAllNames = () => {
    setLocalStorage(localStorageKey, JSON.stringify([defaultItems]))
    setListItems([defaultItems])
  }

  const addNames = (e: any) => {
    const textAreaValue = e.target.value.split("\n")

    let itemsCopy = textAreaValue.slice()
    itemsCopy = getItemsByRows(itemsCopy)

    // if(itemsCopy.length > maxWheelLength) {
    //   let firstElement = itemsCopy.slice().shift()

    //   firstElement = firstElement ? firstElement : { name: "", position: -1 }
    //   itemsCopy.push(firstElement)
    // }
    setLocalStorage(localStorageKey, JSON.stringify(itemsCopy))
    setListItems(itemsCopy)
  }

  return (
    <div className="App">
      <div className="app-header">
        <h1>Vantage Point Trivia!</h1>
      </div>
      <div className="selector-wrapper">
        <Board
          items={listItems}
          wheelStatus={wheelStatus}
          results={results}
          winningRow={winningRow}
          spin={beginSpin}
          addNames={addNames}
          clearAllNames={clearAllNames}
        />
      </div>
      <WinnerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        winner={winner}
      />
    </div>
  )
}

export default App
