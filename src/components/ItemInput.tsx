import React from "react"
import { Form } from "react-bootstrap"

import '../lib/styles/ItemInput.css'

interface IItemInput {}

const ItemInput = ({}: IItemInput) => {
  return (
    <div className="item-input">
        <h5>Add Names to Wheel:</h5>
      <Form>
        <Form.Control as="textarea" rows={20} />
      </Form>
    </div>
  )
}

export default ItemInput
