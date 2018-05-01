import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Subscriber} from "./Subscriber";
import {Event} from "./Event";

export class Notifier {
	private subscribers: Map<string, Subscriber> = new Map();

	public add(subscriber: Subscriber): void {
		this.subscribers.set(subscriber.getKey(), subscriber);
	}

	public delete(key: string): boolean {
		return this.subscribers.delete(key);
	}

	public get(key: string): Subscriber | undefined {
		return this.subscribers.get(key);
	}

	public notify(event: Event, data: any): void {
		this.sendNotification(event, data, NotificationType.standard);
	}

	public notifyPriority(event: Event, data: any): void {
		this.sendNotification(event, data, NotificationType.priority);
	}

	private sendNotification(event: Event, data: any, type: NotificationType): void {
		this.subscribers.forEach(subscriber => {
			subscriber.post({
				name: event,
				body: data,
				type: type
			});
		});
	}
}
