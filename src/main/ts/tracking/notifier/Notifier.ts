import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Subscriber} from "./Subscriber";

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

	public notify(eventName: string, eventData: any): void {
		this.sendNotification(eventName, eventData, NotificationType.standard);
	}

	public notifyPriority(eventName: string, eventData: any): void {
		this.sendNotification(eventName, eventData, NotificationType.priority);
	}

	private sendNotification(name: string, data: any, type: NotificationType): void {
		this.subscribers.forEach(subscriber => {
			subscriber.sendNotification({
				name: name,
				body: data,
				type: type
			});
		});
	}
}
