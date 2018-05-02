import {Subscriber} from "../../../ts/tracking/notifier/Subscriber";
import {Notification} from "../../../ts/tracking/notifier/Notification";
import {NotificationType} from "../../../ts/tracking/notifier/NotificationType";
import {Event} from "../../../ts/tracking/notifier/Event";

describe("Subscriber Tests", () => {
	let onStandardSpy: any;
	let onPrioritySpy: any;
	let onUrgentSpy: any;
	let notification: Notification;
	let subscriber: MockSubscriber;

	let delegate = {
		onStandard: function(notification: Notification) {},
		onPriority: function(notification: Notification) {},
		onUrgent: function(notification: Notification) {}
	};

	class MockSubscriber extends Subscriber {
		public static NAME: string = "MockSubscriber";

		constructor() {
			super(MockSubscriber.NAME);

			this.on(Event.LOADED_METADATA, this.onStandard);
			this.on(Event.PLAY, this.onPriority);
		}

		public onStandard(notification: Notification): void {
			delegate.onStandard(notification);
		}

		public onPriority(notification: Notification): void {
			delegate.onPriority(notification);
		}

		// public onUrgent(notification: Notification): void {
		// 	delegate.onUrgent(notification);
		// }
	}

	beforeEach(() => {
		subscriber = new MockSubscriber();

		notification = {
			name: Event.LOADED_METADATA,
			body: {data: 555},
			type: NotificationType.standard
		};

		onStandardSpy  = spyOn(delegate, "onStandard").and.callThrough();
		onPrioritySpy = spyOn(delegate, "onPriority").and.callThrough();
		onUrgentSpy   = spyOn(delegate, "onUrgent").and.callThrough();
	});

	it("startReceivingNotifications should enable receiving notifications", () => {
		// subscriber.startReceivingNotifications();

		for (let i = 0; i < 5; i++) {
			subscriber.post(notification);
		}

		subscriber.startReceivingNotifications();

		expect(delegate.onStandard).toHaveBeenCalledTimes(5);
		expect(delegate.onStandard).toHaveBeenCalledWith(notification);
	});

	it("pauseReceivingNotifications should disable receiving notifications", () => {
		subscriber.pauseReceivingNotifications();
		subscriber.post(notification);

		expect(delegate.onStandard).toHaveBeenCalledTimes(0);
	});

	// it("sendNotification should send urgent notifications immediately", () => {
	// 	notification.name = "urgent";
	// 	notification.type = NotificationType.urgent;
	//
	// 	subscriber.sendNotification(notification);
	//
	// 	expect(delegate.onUrgent).toHaveBeenCalledWith(notification);
	// 	expect(delegate.onUrgent).toHaveBeenCalledTimes(1);
	// });

	it("post() should send priority notifications ahead of the queue", () => {
		subscriber.post({
			name: Event.LOADED_METADATA,
			body: {},
			type: NotificationType.standard
		});

		subscriber.post({
			name: Event.PLAY,
			body: {data: 1},
			type: NotificationType.priority
		});

		subscriber.startReceivingNotifications();

		expect(delegate.onPriority).toHaveBeenCalledBefore(onStandardSpy);
	});

	it("off() should delete the callback", () => {
		subscriber.startReceivingNotifications();
		subscriber.off(Event.LOADED_METADATA);

		subscriber.post({
			name: Event.LOADED_METADATA,
			body: {},
			type: NotificationType.standard
		});

		expect(delegate.onStandard).toHaveBeenCalledTimes(0);
	});

	it("on() should add the callback", () => {
		subscriber.startReceivingNotifications();

		subscriber.on(Event.PLAY, subscriber.onStandard);

		subscriber.post({
			name: Event.PLAY,
			body: {},
			type: NotificationType.standard
		});

		expect(delegate.onStandard).toHaveBeenCalledTimes(1);
	});

	it("getKey should return the subscriber's key", () => {
		expect(subscriber.getKey()).toEqual(MockSubscriber.NAME);
	});
});
