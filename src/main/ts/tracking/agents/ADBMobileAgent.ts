import {Event} from "../event/Event";
import {PubSub} from "pubsub-ts";

export class ADBMobileAgent extends PubSub.Subscriber {
    public static NAME: string = "ADBMobileAgent";

    constructor() {
        super(ADBMobileAgent.NAME);

        this.on(Event.LOADED_METADATA, this.onLoadedMetadata);
        this.start();
    }

    public onLoadedMetadata(data: any) {
        console.log('[ADBMobileAgent]', data);
    }
}
