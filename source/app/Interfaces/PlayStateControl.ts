export interface PlayStateControl {
    /**
     * Play selected sound.
     */
    play(): Promise<void>

    /**
     * Pause selected sound.
     */
    pause(): void

    /**
     * Stop selected sound. Clear state.
     */
    stop(): void
}
