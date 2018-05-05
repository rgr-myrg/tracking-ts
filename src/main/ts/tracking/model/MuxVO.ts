import {Model} from './Model';
import {DataUtil} from '../util/DataUtil';

export class MuxVO {
    // public property_key: string = 'ec83cce4c209447a2af3d62f2';
    // public sub_property_id: string;
    // public page_type: string;
    // public viewer_user_id: string;
    // public experiment_name: string;
    //
    // public static fromTrackingConfig(config: Model.TrackingConfig): MuxVO {
    //     let params: Model.Dictionary = DataUtil.keyValuesToDictionary(config.params);
    //     let vo: MuxVO = new MuxVO();
    //
    //     vo.experiment_name = params.experimentName;
    //     vo.sub_property_id = params.subPropertyId;
    //
    //     return vo;
    // }

    public static format(config: Model.TrackingConfig, data: Model.ContentData): Model.MuxMetadata {
        return {
            property_key: '',
    		page_type: '',
    		viewer_user_id: '',
    		experiment_name: '',
    		sub_property_id: '',
    		player_name: '',
    		player_version: '',
    		player_init_time: 0,
    		video_id: '',
    		video_title: '',
    		video_series: '',
    		video_producer: '',
            // (one of: 'short', 'movie', 'episode', 'clip', 'trailer', 'event')
    		video_content_type: '',
    		// (language codes such as 'en' or 'en-US', etc)
    		video_language_code: '',
    		video_variant_name: '',
    		video_variant_id: '',
    		// (in milliseconds)
    		video_duration: 0,
    		// ('live' or 'on-demand')
    		video_stream_type: '',
    		video_encoding_variant: '',
    		video_cdn: '',
        };
    }
}
