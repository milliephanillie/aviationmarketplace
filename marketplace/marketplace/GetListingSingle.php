<?php

class GetListingSingle {
	public function __construct() {
		$this->boot();
	}

	public function boot() {
		add_action( 'init', [ $this, 'boot' ] );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$namespace = 'marketplace/v1';
		$route     = 'get_aircraft_single';

		register_rest_route( $namespace, $route, array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ $this, 'get_aircraft_single' ]
		) );

		
	}

	public function get_aircraft_single(\WP_REST_Request $request) {
		$params    = $request->get_query_params();
		$id        = $params['ID'] ?? 0;
	}
}

$single = new GetListingSingle();
