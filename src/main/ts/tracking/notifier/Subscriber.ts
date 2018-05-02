import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Event} from "./Event";

export class Subscriber {
	private queue: Notification[] = [];

	private interests: Map<Event, Function> = new Map();
	private key: string;
	private shouldPost: boolean = false;

	constructor(key: string) {
		this.key = key;
	}

	public on(event: Event, callback: Function): void {
		this.interests.set(event, callback);
	}

	public off(event: Event): boolean {
		return this.interests.delete(event);
	}

	public getKey(): string {
		return this.key;
	}

	public startReceivingNotifications(): void {
		this.shouldPost = true;
		this.postNotifications();
	}

	public pauseReceivingNotifications(): void {
		this.shouldPost = false;
	}

	public post(notification: Notification): void {
		switch(notification.type) {
			case NotificationType.standard:
				this.queue.unshift(notification);
				break;

			case NotificationType.priority:
				this.queue.push(notification);
				break;
		}

		this.postNotifications();
	}

	private postNotifications(): void {
		if (!this.shouldPost) {
			return;
		}

		let i = this.queue.length;

		while (i--) {
			let notification: Notification = this.queue[i];
			let callback: Function = <Function> this.interests.get(notification.name);

			if (callback) {
				callback.call(this, notification);
			}
		}
	}
}
