import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Subscriber} from "./Subscriber";

export class Notifier {
	private subscribers: Subscriber[] = [];

	public add(subscriber: Subscriber): void {
		this.subscribers.unshift(subscriber);
	}

	public remove(key: string): Subscriber | undefined {
		// let subscriber: Subscriber | undefined;
		// let i = this.subscribers.length;
        //
		// while (i--) {
		// 	if (this.subscribers[i].getKey() === key) {
		// 		subscriber = this.subscribers[i];
		// 		this.subscribers.splice(i, 1);
		// 		break;
		// 	}
		// }
        //
		// return subscriber;
		return this.getSubscriberSpliceIfTrue(key, true);
	}

	public get(key: string): Subscriber | undefined {
		// let subscriber: Subscriber | undefined;
		// let i = this.subscribers.length;
        //
		// while (i--) {
		// 	if (this.subscribers[i].getKey() === key) {
		// 		subscriber = this.subscribers[i];
		// 		break;
		// 	}
		// }
        //
		// return subscriber;
		return this.getSubscriberSpliceIfTrue(key, false);
	}

	public getSubscriberCount(): number {
		return this.subscribers.length;
	}

	public notify(eventName: string, eventData: any): void {
		this.sendNotification(eventName, eventData, NotificationType.standard);
	}

	public notifyPriority(eventName: string, eventData: any): void {
		this.sendNotification(eventName, eventData, NotificationType.priority);
	}

	public notifyUrgent(eventName: string, eventData: any): void {
		this.sendNotification(eventName, eventData, NotificationType.urgent);
	}

	private sendNotification(eventName: string, eventData: any, eventType: NotificationType): void {
		let i = this.subscribers.length;

		while (i--) {
			this.subscribers[i].sendNotification({
				name: eventName,
				body: eventData,
				type: eventType
			});
		}
	}

	private getSubscriberSpliceIfTrue(key: string, remove: boolean): Subscriber | undefined {
		let subscriber: Subscriber | undefined;
		let i = this.subscribers.length;

		while (i--) {
			if (this.subscribers[i].getKey() === key) {
				subscriber = this.subscribers[i];

				if (remove) {
					this.subscribers.splice(i, 1);
				}

				break;
			}
		}

		return subscriber;
	}
}
