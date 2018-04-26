import {Subscriber} from "./Subscriber";
import {Notification} from "./Notification";

export class NotificationInterest {
	private interests: Map<string, Function> = new Map();
	private subscriber: Subscriber;

	constructor(subscriber: Subscriber) {
		this.subscriber = subscriber;
	}

	public subscribe(list: Interest[]):void {
		for (let item of list) {
			this.interests.set(item.on, item.callback);
		}
	}

	public unsubscribe(eventName: string): void {
		this.interests.delete(eventName);
	}

	public post(notification: Notification): void {
		if (!this.has(notification.name)) {
			return;
		}

		let callback: Function = <Function> this.interests.get(notification.name);

		if (callback) {
			callback.call(this.subscriber, notification);
		}
	}

	public has(eventName: string): boolean {
		return this.interests.has(eventName);
	}
}

export interface Interest {
	on: string;
	callback: Function;
}
