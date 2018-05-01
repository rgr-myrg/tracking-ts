import {Subscriber} from "../notifier/Subscriber";
import {Event} from "../notifier/Event";

export class ADBMobileAgent extends Subscriber {
    public static NAME: string = "ADBMobileAgent";

    constructor() {
        super(ADBMobileAgent.NAME);

        this.on(Event.LOADED_METADATA, this.onLoadedMetadata);
    }

    public onLoadedMetadata(data: any) {
        console.log('[ADBMobileAgent]', data);
    }
}
