import {PubSub} from 'pubsub-ts';
import {Event} from '../event/Event';
import {Model} from '../model/Model';

export class MuxAgent extends PubSub.Subscriber {
    public static KEY: string = 'MuxQOSPluginJS';

    public config: Model.TrackingConfig;
    public videoElement: HTMLElement | undefined;

    constructor(config: Model.TrackingConfig) {
        super(MuxAgent.KEY);

        this.config = config;

        this.on(Event.PLAYER_LOADED, this.onPlayerLoaded);
        this.on(Event.CONTENT_DATA_LOADED, this.onContentDataLoaded);
        this.start();
    }

    public onPlayerLoaded(notification: PubSub.Notification): void {
        let videoElement: HTMLElement = notification.body;

        this.videoElement = videoElement;
    }

    public onContentDataLoaded(notification: PubSub.Notification):void {
        let data: Model.ContentData = notification.body;

        if ((window as any).mux) {
            (window as any).mux.monitor(this.videoElement, {
                debug: true,
                data: data
            });
        }
        /*
        mux.monitor(videoElement, {
            'debug': true,
            'data': mux_metadata
        });
        */
    }
}
