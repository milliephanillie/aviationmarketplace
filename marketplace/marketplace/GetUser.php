<?php

class GetUser {
	public function __construct() {
		$this->boot();
	}

	public function boot() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$namespace = 'marketplace/v1';
		$route     = 'get_user';

		register_rest_route( $namespace, $route, array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ $this, 'get_user' ],
			'args'     => [
				'user_login' => [
					'required'          => true,
					'type'              => 'string',
					'validate_callback' => function ( $param, $request, $key ) {
						return is_string( $param );
					}
				],
			]
		) );
	}

	/**
	 * Get the user info we need
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return WP_Error|WP_HTTP_Response|WP_REST_Response
	 */
	public function get_user( \WP_REST_Request $request ) {
		$params = $request->get_query_params();
		$user_login  = $params['user_login'];

		$user = get_user_by( 'login', $user_login );

		if ( ! $user ) {
			return new WP_REST_Response( [
				"error" => "No account found with that user name.",
			] );
		}

		$data = [
			'ID'              => $user->data->ID,
			'user_login'      => $user->data->user_login,
			'display_name'    => $user->data->display_name,
			'user_email'      => $user->data->user_email,
			'user_registered' => $user->data->user_registered
		];

		$response = new \WP_REST_Response( $data );

		return rest_ensure_response( $response );
	}
}

$user = new GetUser();
