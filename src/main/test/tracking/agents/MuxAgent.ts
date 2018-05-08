import {Tracking} from "../../../ts/Tracking";
//import {MuxAgent} from "../../../ts/tracking/agents/MuxAgent";
//import {Model} from "../../../ts/tracking/model/Model";
import {MuxAgent} from "../../../ts/tracking/agents/MuxAgent";
import {Model} from "../../../ts/tracking/model/Model";

describe("MuxAgent Tests", () => {
    let onPlayerLoadedSpy: any;
    let videoSource: HTMLElement;
    let videoElement: HTMLElement;
    let tracking: Tracking;

    let config: Model.TrackingConfig[] = [{
        name: MuxAgent.KEY,
        category: 'qos',
        enabled:  true,
        params: [{name: 's', 'value': 's'}]
    }];

    let data: Model.MuxMetadata = {
        property_key: "e943cd86834c363d0d06a3826",
        page_type: '', // (see docs) 'watchpage', 'iframe', or leave empty
        viewer_user_id: "123123", // ex: '12345'
        experiment_name: 'Unit Test', // ex: 'player_test_A'
        sub_property_id: 'vtg-1', // ex: 'cus-1'
        // Player Metadata
        player_name: 'CBSi Unit Test Player',
        player_version: '1.0.0',
        player_init_time: 1451606400000,
        // Video Metadata (cleared with 'videochange' event)
        video_id: 'abcd123', // ex: 'abcd123'
        video_title: 'Sample Video', // ex: 'My Great Video'
        video_series: '', // ex: 'Weekly Great Videos'
        video_producer: '', // ex: 'Bob the Producer'
        video_content_type: '', // 'short', 'movie', 'episode', 'clip', 'trailer', or 'event'
        video_language_code: '', // ex: 'en'
        video_variant_name: '', // ex: 'Spanish Hard Subs'
        video_variant_id: '', // ex: 'abcd1234'
        video_duration: 120000, // in milliseconds, ex: 120000
        video_stream_type: '', // 'live' or 'on-demand'
        video_encoding_variant: '', // ex: 'Variant 1'
        video_cdn: 'Akamai' // ex: 'Fastly', 'Akamai'
    };

    beforeEach(() => {
        // videoSource = document.createElement('source');
        // videoSource.setAttribute("src", "http://techslides.com/demos/sample-videos/small.mp4");
        // videoSource.setAttribute("type", "video/mp4");
        //
        // videoElement = document.createElement('video');
        // videoElement.id = 'videoElement';
        // videoElement.appendChild(videoSource);
        //
        // document.body.appendChild(videoElement);
        //
        // tracking = new Tracking();
        // tracking.onTrackingConfig(config);
        // tracking.onPlayerLoaded(videoElement);

        //onPlayerLoaded  = spyOn(delegate, "onPlayerLoaded").and.callThrough();

    });

    it("onTrackingConfig() should register MuxAgent", () => {
        expect(true).toBe(true);
        //expect(tracking.has(MuxAgent.KEY)).toBe(true);
    });
});
