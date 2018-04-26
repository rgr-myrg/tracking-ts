// export {Notification} from "./tracking/notifier/Notification";
// export {NotificationInterest} from "./tracking/notifier/NotificationInterest";
// export {NotificationType} from "./tracking/notifier/NotificationType";
// export {Notifier} from "./tracking/notifier/Notifier";
// export {Subscriber} from "./tracking/notifier/Subscriber";

import {Notifier} from "./tracking/notifier/Notifier";
import {Subscriber} from "./tracking/notifier/Subscriber";
import {Event} from "./tracking/event/Event";
import {ADBMobileAgent} from "./tracking/agents/ADBMobileAgent";

export class Tracking extends Notifier {
    //public event = Event;

    constructor() {
        super();

        if ((window as any).ADBMobileConfig && (window as any).ADBMobileConfig.enabled) {
            this.add(new ADBMobileAgent());
        }
    }

    public getNewSubscriber(id: string): Subscriber {
        return new Subscriber(id);
    }

    public get event() {
        return Event;
    }

    public onLoadedMetadata(data: any): void {
        this.notify(Event.LOADED_METADATA, data);
    }
}

(<any>window).Tracking = Tracking;
