import React from 'react'
import '../lib/styles/SpinButton.css'

interface SpinButtonProps {
    spin: () => void
}

const SpinButton = ({ spin }: SpinButtonProps) => <button onClick={() => spin()} className="spin-wheel">Spin!</button>


export default SpinButton