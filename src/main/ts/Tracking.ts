export {Notification} from "./tracking/notifier/Notification";
export {NotificationInterest} from "./tracking/notifier/NotificationInterest";
export {NotificationType} from "./tracking/notifier/NotificationType";
export {Notifier} from "./tracking/notifier/Notifier";
export {Subscriber} from "./tracking/notifier/Subscriber";

export class Tracking {
    public getId(): string {
        return "rpm";
    }
}

(<any>window).Tracking = Tracking;
