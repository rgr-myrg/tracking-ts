export {Notification} from "./tracking/notifier/Notification";
export {NotificationInterest} from "./tracking/notifier/NotificationInterest";
export {NotificationType} from "./tracking/notifier/NotificationType";
export {Notifier} from "./tracking/notifier/Notifier";
export {Subscriber} from "./tracking/notifier/Subscriber";

import {Subscriber} from "./tracking/notifier/Subscriber";

export class Tracking {
    public getId(): string {
        return "rpm";
    }
    public getNewSubscriber(id: string): Subscriber {
        return new Subscriber(id);
    }
}

(<any>window).Tracking = Tracking;
