<?php

class  UpdateAircraft {
	public function __construct() {
		$this->boot();
	}

	public function boot() {
		add_action( 'rest_api_init', [ $this, 'listing_rest_api' ] );
	}

	public function listing_rest_api() {
		$namespace = 'marketplace/v1';
		$route     = 'update_aircraft';

		register_rest_route( $namespace, $route, array(
			'methods'  => WP_REST_Server::CREATABLE,
			'callback' => [ $this, 'update_aircraft' ],
			'args'     => [
				'ID'         => [
					'required'          => true,
					'type'              => 'integer',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_numeric( $param );
					}
				],
				'post_title' => [
					'required'          => true,
					'type'              => 'string',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_string( $param );
					}
				],
				'category'   => [
					'required'          => false,
					'type'              => 'string',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_string( $param );
					}
				],
				'condition'  => [
					'required'          => false,
					'type'              => 'string',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_string( $param );
					}
				],
				'price'      => [
					'required'          => false,
					'type'              => 'integer',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_numeric( $param );
					}
				],
				'year'       => [
					'required'          => false,
					'type'              => 'integer',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_numeric( $param );
					}
				],
			]
		) );
	}

	public function update_aircraft( \WP_REST_Request $request ) {
		$params    = $request->get_query_params();
		$id        = $params['ID'] ?? 0;
		$category  = $params['category'] ?? null;
		$condition = $params['condition'];
		$price     = $params['price'];
		$year      = $params['year'] ?? null;
		$title     = $params['post_title'] ?? null;
		$location  = $params['location'] ?? null;
		$city      = $params['city'] ?? null;
		$state     = $params['state'] ?? null;
		$zip       = $params['zip'] ?? null;

		$location = $city + ' , ';

		$post = [
			'ID'         => $id,
			'post_title' => $title,
			'category'   => $category,
			'condition'  => $condition,
			'price'      => $price,
			'year'       => $year,
		];

		if ( $id ) {
			$id = wp_update_post( $post, true );
		} else {
			$id = wp_insert_post( $post, true );
		}

		$post_data = get_post( $id );

		$response = new WP_REST_Response(
			[
				'post' => $post_data
			]
		);

		return rest_ensure_response( $response );
	}
}

$update = new UpdateAircraft();
