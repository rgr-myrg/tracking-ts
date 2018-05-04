import {PubSub} from "pubsub-ts";
import {Event} from "./tracking/event/Event";
import {ADBMobileAgent} from "./tracking/agents/ADBMobileAgent";

export class Tracking extends PubSub.Publisher {
    //public event = Event;

    constructor() {
        super();

        if ((window as any).ADBMobileConfig && (window as any).ADBMobileConfig.enabled) {
            this.add(new ADBMobileAgent());
        }
    }
    //
    // public getNewSubscriber(id: string): Subscriber {
    //     return new Subscriber(id);
    // }

    public get event() {
        return Event;
    }

    public onLoadedMetadata(data: any): void {
        this.notify(Event.LOADED_METADATA, data);
    }
}

(<any>window).Tracking = Tracking;
