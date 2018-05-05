export module Model {
    export interface KeyValue {
        name:  string;
        value: any;
    }

    export interface TrackingConfig {
        name:     string;
        category: string;
        enabled:  boolean;
        params:   KeyValue[]
    }

    export interface ContentData {
        [index: string]: any;
    }

    export interface Dictionary {
        [index: string]: any;
    }

    // https://docs.mux.com/docs/metadata
	export interface MuxMetadata {
		property_key: string;
		page_type: string;
		viewer_user_id: string;
		experiment_name: string;
		sub_property_id: string;
		player_name: string;
		player_version: string;
		player_init_time: number;
		video_id: string;
		video_title: string;
		video_series: string;
		video_producer: string;
        // (one of: 'short', 'movie', 'episode', 'clip', 'trailer', 'event')
		video_content_type: string;
		// (language codes such as 'en' or 'en-US', etc)
		video_language_code: string;
		video_variant_name: string;
		video_variant_id: string;
		// (in milliseconds)
		video_duration: number;
		// ('live' or 'on-demand')
		video_stream_type: string;
		video_encoding_variant: string;
		video_cdn: string;
	}
}

/*
{
    name: 'UVPJSDebug',
    category: 'internal',
    enabled: true,
    params: [{
        name: "showAll",
        value: true
    }]
}
*/
