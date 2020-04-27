import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

import "../lib/styles/ItemInput.css"
import { IItems } from "../helpers/types"

interface IItemInput {
  addNames: (e: any) => void
  items: IItems[]
  clearAllNames: () => void
}

const ItemInput = ({ addNames, items, clearAllNames }: IItemInput) => {
  const getItems = () => items.map((i: IItems) => i.name).join("\n")
  return (
    <div className="item-input">
      <h5>Add Names to Wheel:</h5>
      {/* <div className="clear-names">
        <Button className="clear-names-btn" onClick={() => clearAllNames()}>Clear all names</Button>
      </div> */}
      <Form>
        <Form.Control
          onKeyUp={(e: any) => addNames(e)}
          as="textarea"
          rows={20}
          defaultValue={getItems()}
        />
      </Form>
    </div>
  )
}

export default ItemInput
