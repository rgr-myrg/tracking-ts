import {Notifier} from "../../../ts/tracking/notifier/Notifier";
import {Subscriber} from "../../../ts/tracking/notifier/Subscriber";
import  {Event} from "../../../ts/tracking/notifier/Event";

describe("Notifier Tests", () => {
	let notifier: Notifier;
	let subscriber: Subscriber;
	let message: string;
	let subscriberSpy: any;

	beforeEach(() => {
		notifier = new Notifier();
		subscriber = new Subscriber("SubscriberKey");

		subscriber.on(Event.LOADED_METADATA, (data: string) => {
			message = data;
		});

		subscriberSpy = spyOn(subscriber, "post").and.callThrough();
	});

	it("get() should return the Receiver", () => {
		notifier.add(subscriber);

		let registered: Subscriber | undefined = notifier.get("SubscriberKey");

		expect(registered).toEqual(subscriber);
	});

	it("delete() should remove the Receiver", () => {
		notifier.add(subscriber);

		let removed: boolean = notifier.delete("SubscriberKey");

		expect(removed).toEqual(true);
	});

	it("post() should send the notification", () => {
		notifier.add(subscriber);
		notifier.notify(Event.LOADED_METADATA, "test");

		expect(subscriber.post).toHaveBeenCalledTimes(1);
		expect(message).toEqual("test");
	});

	it("notifyPriority should send the priority notification", () => {
		notifier.add(subscriber);
		notifier.notifyPriority(Event.LOADED_METADATA, {data: "test"});

		expect(subscriber.post).toHaveBeenCalledTimes(1);
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
