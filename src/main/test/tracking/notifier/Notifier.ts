import {Notifier} from "../../../ts/tracking/notifier/Notifier";
import {Subscriber} from "../../../ts/tracking/notifier/Subscriber";

describe("Notifier Tests", () => {
	let notifier: Notifier;
	let subscriber: Subscriber;
	let subscriberSpy: any;

	beforeEach(() => {
		notifier = new Notifier();
		subscriber = new Subscriber("SubscriberKey");
		subscriberSpy = spyOn(subscriber, "sendNotification").and.callThrough();
	});

	// it("addReceiver should register a Receiver", () => {
	// 	notifier.add(subscriber);
	//
	// 	expect(notifier.getSubscriberCount()).toEqual(1);
	// });

	it("getReceiver should return the Receiver", () => {
		notifier.add(subscriber);

		let registered: Subscriber | undefined = notifier.get("SubscriberKey");

		expect(registered).toEqual(subscriber);
	});

	it("removeReceiver should remove the Receiver", () => {
		notifier.add(subscriber);

		let removed: boolean = notifier.delete("SubscriberKey");

		expect(removed).toEqual(true);
	});

	it("notify should send the notification", () => {
		notifier.add(subscriber);
		notifier.notify("send", {data: "test"});

		expect(subscriber.sendNotification).toHaveBeenCalledTimes(1);
	});

	it("notifyPriority should send the priority notification", () => {
		notifier.add(subscriber);
		notifier.notifyPriority("send", {data: "test"});

		expect(subscriber.sendNotification).toHaveBeenCalledTimes(1);
	});

	// it("notifyUrgent should send the urgent notification", () => {
	// 	/* mock callback */
	// 	subscriber.notificationInterest.subscribe([
	// 		{on: "send", callback: () => {}}
	// 	]);
	//
	// 	notifier.add(subscriber);
	// 	notifier.notifyUrgent("send", {data: "test"});
	//
	// 	expect(subscriber.sendNotification).toHaveBeenCalledTimes(1);
	// });
});
