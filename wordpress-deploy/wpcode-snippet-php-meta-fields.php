<?php
/**
 * MRII Podcast App – Expose Captivate Meta Fields via REST API
 *
 * Paste this into WPCode as a PHP Snippet.
 * Run Everywhere (or "Site Wide") is fine.
 *
 * This registers three extra fields on the /wp-json/wp/v2/podcast endpoint:
 *   episode_description  – show notes HTML  (stored in WP meta key: description)
 *   episode_transcript   – full transcript HTML (meta key: episode_transcript)
 *   episode_player       – Captivate iframe embed HTML (meta key: podbean_code)
 */

add_action( 'rest_api_init', function () {

    // --- Show Notes / Description ---
    register_rest_field( 'podcast', 'episode_description', [
        'get_callback' => function ( $post_data ) {
            return get_post_meta( $post_data['id'], 'description', true ) ?: '';
        },
        'schema' => [
            'description' => 'Episode show notes (HTML)',
            'type'        => 'string',
        ],
    ] );

    // --- Full Transcript ---
    register_rest_field( 'podcast', 'episode_transcript', [
        'get_callback' => function ( $post_data ) {
            return get_post_meta( $post_data['id'], 'episode_transcript', true ) ?: '';
        },
        'schema' => [
            'description' => 'Episode full transcript (HTML)',
            'type'        => 'string',
        ],
    ] );

    // --- Captivate Player Embed ---
    register_rest_field( 'podcast', 'episode_player', [
        'get_callback' => function ( $post_data ) {
            return get_post_meta( $post_data['id'], 'podbean_code', true ) ?: '';
        },
        'schema' => [
            'description' => 'Captivate player iframe embed HTML',
            'type'        => 'string',
        ],
    ] );

} );
