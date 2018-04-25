import {Notification} from "./Notification";
import {NotificationType} from "./NotificationType";
import {Subscriber} from "./Subscriber";

export class Notifier {
	private receivers: Subscriber[] = [];

	public addReceiver(receiver: Subscriber): void {
		this.receivers.unshift(receiver);
	}

	public removeReceiver(key: string): Subscriber | undefined {
		let receiver: Subscriber | undefined;
		let i = this.receivers.length;

		while (i--) {
			if (this.receivers[i].getKey() === key) {
				receiver = this.receivers[i];
				this.receivers.splice(i, 1);
				break;
			}
		}

		return receiver;
	}

	public getReceiver(key: string): Subscriber | undefined {
		let receiver: Subscriber | undefined;
		let i = this.receivers.length;

		while (i--) {
			if (this.receivers[i].getKey() === key) {
				receiver = this.receivers[i];
				break;
			}
		}

		return receiver;
	}

	public getReceiverCount(): number {
		return this.receivers.length;
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
		let i = this.receivers.length;

		while (i--) {
			this.receivers[i].sendNotification({
				name: eventName,
				body: eventData,
				type: eventType
			});
		}
	}
}
