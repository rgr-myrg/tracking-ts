import {Subscriber} from "../notifier/Subscriber";
import {Event} from "../event/Event";

export class ADBMobileAgent extends Subscriber {
    public static NAME: string = "ADBMobileAgent";

    constructor() {
        super(ADBMobileAgent.NAME);

        this.notificationInterest.subscribe([
            {on: Event.LOADED_METADATA, callback: this.onLoadedMetadata}
        ]);
    }

    public onLoadedMetadata(data: any) {
        console.log('[ADBMobileAgent]', data);
    }
}
