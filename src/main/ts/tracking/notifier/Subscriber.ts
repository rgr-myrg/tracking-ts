import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {NotificationInterest} from "./NotificationInterest";

export class Subscriber {
	// private standard: Notification[] = [];
	// private priority: Notification[] = [];
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
				//this.standard.unshift(notification);
				this.notifications.unshift(notification);
				break;

			case NotificationType.priority:
				//this.priority.unshift(notification);
				this.notifications.push(notification);
				break;

			case NotificationType.urgent:
				this.notificationInterest.post(notification);
				break;
		}

		this.postNotifications();
	}

	public getKey(): string | undefined {
		return this.key;
	}

	// public destroy(): void {
	// 	// delete this.standard;
	// 	// delete this.priority;
	// }

	// private postNotifications(): void {
	// 	this.process(this.priority);
	// 	this.process(this.standard);
	// }

	private postNotifications(): void {
		let i = this.notifications.length;

		while (i--) {
			let notification: Notification = <Notification> this.notifications.shift();
			this.notificationInterest.post(notification);
		}
	}
}
