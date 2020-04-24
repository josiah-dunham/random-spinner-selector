import React from "react"
import { Modal, Button } from 'react-bootstrap'

import {modalContent} from '../helpers/constants'

import '../lib/styles/WinnerModal.css'

interface IWinnerModal {
    show: boolean
    onHide: () => void
    winner: string
}

const WinnerModal = ({show, onHide, winner}: IWinnerModal) => {
    const getModalTitle = () => modalContent.title ? modalContent.title.replace('/{winner-name}/g', winner) : null

    const getModalBodyHeader = () => modalContent.bodyHeader ? <h4>{modalContent.bodyHeader.replace(/{winner-name}/g, winner)}</h4> : null

    const getModalBody = () => modalContent.bodyContent ? modalContent.bodyContent.replace('/{winner-name}/g', winner) : null

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            {getModalTitle()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {getModalBodyHeader()}
        <p>
            {getModalBody()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className="btn-primary winner-modal-close">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WinnerModal
