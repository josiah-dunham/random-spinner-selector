export interface WheelStatus {
    isSpinning: boolean
    isSlowingDown: boolean
    slowDownRate: number
    intervalSpeed: number
}

export interface Results {
    numberOfSpins: number
    winners: string[]
}