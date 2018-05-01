import {NotificationType} from "./NotificationType";
import {Event} from "./Event";

export interface Notification {
	name: Event;
	body: any;
	type: NotificationType;
}
