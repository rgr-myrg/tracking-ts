import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Event} from "./Event";

export class Subscriber {
	private notifications: Notification[] = [];
	private interests: Map<Event, Function> = new Map();
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	public on(key: Event, callback: Function): void {
		this.interests.set(key, callback);
	}

	public off(key: Event): boolean {
		return this.interests.delete(key);
	}

	public getKey(): string {
		return this.key;
	}

	public post(notification: Notification): void {
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

	private postNotifications(): void {
		let i = this.notifications.length;

		while (i--) {
			let notification: Notification = this.notifications[i];
			let callback: Function = <Function> this.interests.get(notification.name);

			if (callback) {
				callback.call(this, notification.body);
			}
		}
	}
}
