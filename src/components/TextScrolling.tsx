import React, { useState, useEffect } from "react"
import "../lib/styles/App.css"
import "../lib/styles/scrolling.css"

import { items } from "../helpers/constants"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"

const App = () => {
  const [rotation, setRotation] = useState(0)
  const [listItems, setListItems] = useState(items)

  useEffect(() => {}, [listItems])

  const maxw = 20
  const maxh = 20

  const padh = 10
  const padleft = 10

  const stageStyle = {
    paddingLeft: `${(maxw * 3) / 4}px`,
    height: `${maxh}px`,
  }

  const spinnerStyle = {
    WebkitTransformOrigin: `${(maxw * 3) / 4}px 0 0`,
  }

  const round = (numToRound: number) => Math.round(numToRound * 10) / 10

  const getSpinningDivStyle = (num: any) => {
    const _rotation = (num + 1) * (rotation + 360 / listItems.length)
    const rotDeg = `${round(_rotation).toString()}deg`

    const spinningDivStyle = {
      WebkitTransform: `rotateY(-${rotDeg}) translateX(${(maxw * 3) / 4}px)`,
      padding: `${padh}px 0 ${padh}px ${padleft + maxw / 2}px`,
    }

    return spinningDivStyle
  }

  return (
    <div className="App">
      <div className="selector-wrapper">
        <div className="items-wrapper">
          <div id="stage" style={stageStyle}></div>
          <div id="spinner" style={spinnerStyle}></div>
          {listItems.map((i, idx) => (
            <div style={getSpinningDivStyle(idx)}>
              <div key={idx} className="item">
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
