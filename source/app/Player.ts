import {ElementKeeper} from "./ElementKeeper";
import {PlayStateControl} from "./Interfaces/PlayStateControl";
import {Track} from "./Track";

export class Player extends ElementKeeper implements PlayStateControl {
    /**
     * Player volume on init.
     */
    private readonly DEFAULT_VOLUME = '80';

    /**
     * Volume control input.
     */
    private volumeInput: HTMLInputElement

    /**
     * The soundtrack.
     */
    private track: Track

    constructor(el: HTMLElement, volumeWrap: HTMLElement, tracks: NodeListOf<HTMLElement>) {
        super(el);

        // Insert volume control.
        this.setupVolume(volumeWrap);
        // Setup track click callback.
        tracks.forEach(track =>
            track.addEventListener('click', e => this.setupTrack(track)))
    }

    /**
     * Insert volume input and setup input/change event.
     * @param wrap Volume wrapper for insert.
     */
    private setupVolume(wrap: HTMLElement): void {
        if (!wrap) throw new Error('Volume wrapper not found!');

        this.volumeInput = document.createElement('input');
        this.volumeInput.type = 'range';
        this.volumeInput.min = '0';
        this.volumeInput.max = '100';
        this.volumeInput.value = this.DEFAULT_VOLUME;

        this.volumeInput.addEventListener('input', () => {
            // Transfer volume to track.
            if (this.track) this.track.volume = this.volume;
        });

        this.volumeInput.addEventListener('change', () => {
            console.log(`Volume is changed to ${this.volume} percent.`);
        });

        wrap.appendChild(this.volumeInput);
    }

    /**
     * @param track Track wrapper.
     */
    private setupTrack(track: HTMLElement): void {
        const newTrack = new Track(track);

        if (this.isMatchTrack(newTrack)) {
            this.toggle();
        } else {
            this
                .setTrack(newTrack)
                .play();
        }
    }

    /**
     * Check is track already set.
     */
    public isMatchTrack(track: Track): boolean {
        return this.track && this.track.id === track.id;
    }

    public setTrack(track: Track): this {
        this.track?.stop();

        this.el.className = `player player_${track.id}`;
        // Set new track instance to property.
        this.track = track;
        this.track.volume = this.volume;

        console.log(`Track is changed to ${track.id}`);
        return this;
    }

    public toggle(): void {
        this.track.isPaused ?
            this.track.play() :
            this.track.pause();
    }

    public async play(): Promise<void> {
        return await this.track.play();
    }

    public pause(): void {
        this.track.pause();
    }

    public stop(): void {
        this.track.stop();
    }

    get volume() {
        return this.volumeInput.value;
    }
}
