<?php
/**
 * Add custom block types
 */
add_action('acf/init', function() {

    // Check function exists.
    if( function_exists('acf_register_block_type') ) {

        // register a testimonial block.
        acf_register_block_type(array(
            'name'              => 'testimonial',
            'title'             => __('Testimonial'),
            'description'       => __('A custom testimonial block.'),
            'render_callback'   => function() {},
            'category'          => 'formatting',
            'icon'              => 'admin-comments',
            'keywords'          => array( 'testimonial', 'quote' ),
			'mode' 				=> 'edit',
			'supports'			=> [
				'mode' => false,
			]
        ));
    }
});


/**
 * Get an object from the wp_posts table by its permalink
 * @return post object
 */
function wp_api_v2_get_post_by_permalink ( $request ) {
	
	/*
	 *	TODO: sanitize the input a little better
	 */
	
	// determine if we have an id or a permalink
	$request['id']	=	url_to_postid( $request['url'] );
	
	/*
	 *	TODO: Look at how to determine how many results from the query and respond accordingly
	 */
	
	// response for nothing found
	if( !$request['id'] ) {
		return new WP_Error( 'id_not_found', 'No objects in wp_posts for permalink: '. $request['url'], array( 'status' => 404 ) );
	}
	
	// query for the object based on $id - will not return revisions or post types registered with exclude_from_search
	$q	=	new WP_Query(array( 
		'post_type' => 'any',
		'post__in'	=>	array( $request['id'] )
	));
	
	// should only find one object in wp_posts
	if( $q->post_count > 1 ) {
		return new WP_Error( 'multiple_ids_found', 'Multiple objects found in wp_posts for permalink: '. $request['url'], array( 'status' => 404 ) );
	}
	
	// prepare wp_post object for response
	if( $q->have_posts() ) {
		$q->the_post();
		
		$controller	=	new WP_REST_Posts_Controller( get_post_type() );
		
		return $controller->get_item( $request );
	}
	
	// catch other cases with an unknown error
	return new WP_Error( 'unknown_error', 'An unknown error occured in wp_api_v2_get_post_by_permalink while searching for '. $request['url'], array( 'status' => 500 ) );
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/permalink', array(
        'methods' => 'GET',
        'callback' => 'wp_api_v2_get_post_by_permalink',
    ) );
} );


add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/page_on_front', array(
        'methods' => 'GET',
        'callback' => function() {
			$request['id'] = get_option( 'page_on_front' );

			// response for nothing found
			if( !$request['id'] ) {
				return new WP_Error( 'id_not_found', 'No objects in wp_posts for page_on_front: '. $request['url'], array( 'status' => 404 ) );
			}
			
			// query for the object based on $id - will not return revisions or post types registered with exclude_from_search
			$q	=	new WP_Query(array( 
				'post_type' => 'any',
				'post__in'	=>	array( $request['id'] )
			));
			
			// should only find one object in wp_posts
			if( $q->post_count > 1 ) {
				return new WP_Error( 'multiple_ids_found', 'Multiple objects found in wp_posts for permalink: '. $request['url'], array( 'status' => 404 ) );
			}
			
			// prepare wp_post object for response
			if( $q->have_posts() ) {
				$q->the_post();
				
				$controller	=	new WP_REST_Posts_Controller( get_post_type() );
				
				return [ 'slug' => $controller->get_item( $request )->data['slug'] ];
			}
			
			// catch other cases with an unknown error
			return new WP_Error( 'unknown_error', 'An unknown error occured in wp_api_v2_get_post_by_permalink while searching for '. $request['url'], array( 'status' => 500 ) );
		},
    ) );
} );