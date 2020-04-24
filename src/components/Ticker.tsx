import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import '../lib/styles/Ticker.css'

interface TickerProps {
    icon: IconDefinition
}

const Ticker = ({ icon }: TickerProps) => (
    <div className="ticker">
        <FontAwesomeIcon size="2x" icon={icon} />
    </div>
)

export default Ticker