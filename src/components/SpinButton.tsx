import React from 'react'
import '../lib/styles/SpinButton.css'
import { Button } from 'react-bootstrap'

interface SpinButtonProps {
    spin: () => void
}

const SpinButton = ({ spin }: SpinButtonProps) => <Button onClick={() => spin()} className="btn-primary spin-wheel">Spin!</Button>


export default SpinButton