import {Notifier} from "../../../ts/tracking/notifier/Notifier";
import {Subscriber} from "../../../ts/tracking/notifier/Subscriber";

describe("Notifier Tests", () => {
	let notifier: Notifier;
	let receiver: Subscriber;
	let receiverSpy: any;

	beforeEach(() => {
		notifier = new Notifier();
		receiver = new Subscriber("ReceiverKey");
		receiverSpy = spyOn(receiver, "sendNotification").and.callThrough();
	});

	it("addReceiver should register a Receiver", () => {
		notifier.addReceiver(receiver);

		expect(notifier.getReceiverCount()).toEqual(1);
	});

	it("getReceiver should return the Receiver", () => {
		notifier.addReceiver(receiver);

		let registered: Subscriber | undefined = notifier.getReceiver("ReceiverKey");

		expect(registered).toEqual(receiver);
	});

	it("removeReceiver should remove the Receiver", () => {
		notifier.addReceiver(receiver);

		let removed: Subscriber | undefined = notifier.removeReceiver("ReceiverKey");

		expect(notifier.getReceiverCount()).toEqual(0);
		expect(removed).toEqual(receiver);
	});

	it("notify should send the notification", () => {
		notifier.addReceiver(receiver);
		notifier.notify("send", {data: "test"});

		expect(receiver.sendNotification).toHaveBeenCalledTimes(1);
	});

	it("notifyPriority should send the priority notification", () => {
		notifier.addReceiver(receiver);
		notifier.notifyPriority("send", {data: "test"});

		expect(receiver.sendNotification).toHaveBeenCalledTimes(1);
	});

	it("notifyUrgent should send the urgent notification", () => {
		/* mock callback */
		receiver.notification.subscribe([
			{on: "send", callback: () => {}}
		]);

		notifier.addReceiver(receiver);
		notifier.notifyUrgent("send", {data: "test"});

		expect(receiver.sendNotification).toHaveBeenCalledTimes(1);
	});
});
