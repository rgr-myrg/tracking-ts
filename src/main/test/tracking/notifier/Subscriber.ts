import {Subscriber} from "../../../ts/tracking/notifier/Subscriber";
import {Notification} from "../../../ts/tracking/notifier/Notification";
import {NotificationType} from "../../../ts/tracking/notifier/NotificationType";
import {Event} from "../../../ts/tracking/notifier/Event";

describe("Subscriber Tests", () => {
	let onReceiveSpy: any;
	let onPrioritySpy: any;
	let onUrgentSpy: any;
	let notification: Notification;
	let subscriber: MockSubscriber;

	let delegate = {
		onReceive: function(notification: Notification) {},
		onPriority: function(notification: Notification) {},
		onUrgent: function(notification: Notification) {}
	};

	class MockSubscriber extends Subscriber {
		public static NAME: string = "MockSubscriber";
		constructor() {
			super(MockSubscriber.NAME);

			this.on(Event.LOADED_METADATA, this.onReceive);
			// this.notificationInterest.subscribe([
			// 	{on: "receive", callback: this.onReceive},
			// 	{on: "priority", callback: this.onPriority},
			// 	{on: "urgent", callback: this.onUrgent}
			// ]);
		}
		public onReceive(notification: Notification): void {
			delegate.onReceive(notification);
		}
		public onPriority(notification: Notification): void {
			delegate.onPriority(notification);
		}
		public onUrgent(notification: Notification): void {
			delegate.onUrgent(notification);
		}
	}

	beforeEach(() => {
		subscriber = new MockSubscriber();

		notification = {
			name: Event.LOADED_METADATA,
			body: {data: 555},
			type: NotificationType.standard
		};

		onReceiveSpy  = spyOn(delegate, "onReceive").and.callThrough();
		onPrioritySpy = spyOn(delegate, "onPriority").and.callThrough();
		onUrgentSpy   = spyOn(delegate, "onUrgent").and.callThrough();
	});

	// it("startReceivingNotifications should enable receiving notifications", () => {
	// 	subscriber.startReceivingNotifications();
    //
	// 	for (let i = 0; i < 5; i++) {
	// 		subscriber.sendNotification(notification);
	// 	}
    //
	// 	expect(delegate.onReceive).toHaveBeenCalledTimes(5);
	// 	expect(delegate.onReceive).toHaveBeenCalledWith(notification);
	// });

	// it("pauseReceivingNotifications should disable receiving notifications", () => {
	// 	subscriber.pauseReceivingNotifications();
	// 	subscriber.sendNotification(notification);
    //
	// 	expect(delegate.onReceive).toHaveBeenCalledTimes(0);
	// });

	// it("sendNotification should send urgent notifications immediately", () => {
	// 	notification.name = "urgent";
	// 	notification.type = NotificationType.urgent;
	//
	// 	subscriber.sendNotification(notification);
	//
	// 	expect(delegate.onUrgent).toHaveBeenCalledWith(notification);
	// 	expect(delegate.onUrgent).toHaveBeenCalledTimes(1);
	// });

	// it("sendNotification should send priority notifications ahead of the queue", () => {
	// 	subscriber.sendNotification({
	// 		name: "receive",
	// 		body: {},
	// 		type: NotificationType.standard
	// 	});
	//
	// 	subscriber.sendNotification({
	// 		name: "priority",
	// 		body: {data: 1},
	// 		type: NotificationType.priority
	// 	});
	//
	// 	//subscriber.startReceivingNotifications();
	//
	// 	expect(delegate.onPriority).toHaveBeenCalledBefore(onReceiveSpy);
	// });

	it("off() should delete the callback", () => {
		//subscriber.startReceivingNotifications();

		subscriber.off(Event.LOADED_METADATA);

		subscriber.post({
			name: Event.LOADED_METADATA,
			body: {},
			type: NotificationType.standard
		});

		//expect(subscriber.notificationInterest.has("receive")).toBe(false);
		expect(delegate.onReceive).toHaveBeenCalledTimes(0);
	});

	it("on() should add the callback", () => {
		//subscriber.startReceivingNotifications();

		subscriber.on(Event.LOADED_METADATA, subscriber.onReceive);
		subscriber.post({
			name: Event.LOADED_METADATA,
			body: {},
			type: NotificationType.standard
		});

		expect(delegate.onReceive).toHaveBeenCalledTimes(1);
	});

	it("getKey should return the subscriber's key", () => {
		expect(subscriber.getKey()).toEqual(MockSubscriber.NAME);
	});
});
