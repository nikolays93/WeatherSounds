import {ElementKeeper} from "./ElementKeeper";
import {PlayStateControl} from "./Interfaces/PlayStateControl";

export class Track extends ElementKeeper implements PlayStateControl {
    private readonly CLASSNAME_PAUSED = 'track_paused';
    private readonly CLASSNAME_PLAYED = 'track_playing';

    private audioInput: HTMLAudioElement

    constructor(el) {
        super(el);

        if (!this.el.id) {
            throw Error('Track is has not ID');
        }

        this.audioInput = this.el.querySelector('audio');
        if (!this.audioInput) {
            throw Error('Track is has not audio input');
        }
    }

    async play(): Promise<void> {
        return await this.audioInput.play()
            .then(r => {
                this.el.classList.remove(this.CLASSNAME_PAUSED);
                this.el.classList.add(this.CLASSNAME_PLAYED);

                console.log(`Track "${this.id}" was started.`);
                return r;
            });
    }

    pause(): void {
        this.audioInput.pause();

        if (this.isPaused) {
            this.el.classList.remove(this.CLASSNAME_PLAYED);
            this.el.classList.add(this.CLASSNAME_PAUSED);

            console.log(`Track "${this.id}" was paused.`);
        }
    }

    stop(): void {
        this.audioInput.pause();
        // Reset to beginning.
        this.audioInput.currentTime = 0;

        this.el.classList.remove(this.CLASSNAME_PLAYED);
        this.el.classList.remove(this.CLASSNAME_PAUSED);

        console.log(`Track "${this.id}" was stopped.`);
    }

    /**
     * @param volume volume in percent
     */
    set volume(volume: string | number) {
        if ('string' === typeof volume) {
            volume = parseInt(volume) / 100;
        }

        this.audioInput.volume = volume;
    }

    get id(): string {
        return this.el.id;
    }

    get isPaused(): boolean {
        return this.audioInput.paused;
    }
}