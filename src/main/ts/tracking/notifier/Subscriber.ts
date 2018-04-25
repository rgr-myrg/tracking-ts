import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {NotificationInterest} from "./NotificationInterest";

export class Subscriber {
	private notifications: Notification[] = [];
	private key: string;

	public notificationInterest: NotificationInterest;

	constructor(key: string) {
		this.key = key;
		this.notificationInterest = new NotificationInterest(this);
	}

	public sendNotification(notification: Notification): void {
		switch(notification.type) {
			case NotificationType.standard:
				this.notifications.unshift(notification);
				break;

			case NotificationType.priority:
				this.notifications.push(notification);
				break;
		}

		this.postNotifications();
	}

	public getKey(): string {
		return this.key;
	}

	private postNotifications(): void {
		let i = this.notifications.length;

		while (i--) {
			this.notificationInterest.post(<Notification> this.notifications.shift());
		}
	}
}
