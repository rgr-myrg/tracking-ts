import {NotificationType} from "./NotificationType";

export interface Notification {
	name: string;
	body: any;
	type: NotificationType;
}
