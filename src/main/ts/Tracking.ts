import {PubSub} from 'pubsub-ts';
import {Event} from './tracking/event/Event';
import {Model} from './tracking/model/Model';
import {MuxAgent} from './tracking/agents/MuxAgent';
import {ADBMobileAgent} from './tracking/agents/ADBMobileAgent';

export class Tracking extends PubSub.Publisher {
    constructor() {
        super();

        // if ((window as any).ADBMobileConfig && (window as any).ADBMobileConfig.enabled) {
        //     this.add(new ADBMobileAgent());
        // }
    }

    public onTrackingConfig(configList: Model.TrackingConfig[]): void {
        configList.forEach(config => {
            this.registerAgent(config);
        });
    }

    public onPlayerLoaded(videoElement: HTMLElement): void {
        this.notify(Event.PLAYER_LOADED, videoElement);
    }

    public onContentDataLoaded(data: Model.ContentData): void {
        this.notify(Event.CONTENT_DATA_LOADED, data);
    }

    private registerAgent(config: Model.TrackingConfig): void {
        if (!config.enabled) {
            return;
        }

        switch (config.name) {
            case MuxAgent.NAME:
                this.add(new MuxAgent(config));
                break;
        }
    }
}

(<any>window).Tracking = Tracking;
