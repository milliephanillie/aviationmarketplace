<?php

class GetListings {
	public function __construct() {
		$this->boot();
	}

	public function boot() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$namespace = 'marketplace/v1';
		$route     = 'get_aircraft';

		register_rest_route( $namespace, $route, array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ $this, 'get_aircraft' ]
		) );
	}

    /**
     * Get aircraft by aircraft type
     *
     * @param WP_REST_Request $request
     * @return WP_Error|WP_HTTP_Response|WP_REST_Response
     */
	public function get_aircraft(\WP_REST_Request $request) {
        $params = $request->get_query_params();
        $posts_per_page = $params['per_page'] ?? 9;
        $aircraft_type = $params['aircraft_type'] ?? null;

        $paged = 1;

		$args = [
			'post_status'    => 'any',
			'posts_per_page' => $posts_per_page,
			'post_type'      => [ 'aircraft', 'real_estate' ],
		];

        if($aircraft_type) {
            $tax_query = [
                'tax_query' => [
                    [
                        'taxonomy' => 'aircraft_type',
                        'field' => 'name',
                        'terms' => $aircraft_type,
                    ]
                ]
            ];

            $args = array_merge($args, $tax_query);
        }

		$query = new WP_Query( $args );

		$res = [
			'posts' => []
		];

        if ( ! $query ) {
            return new \WP_REST_Response([
                "error" => "Check WP Query",
            ]);
        }

		if ( ! $query->found_posts ) {
            $message = ($paged == 1) ? 'No found posts' : '';

			return new \WP_REST_Response([
                "error" => $message,
                "per_page" => $posts_per_page,
                "aircraft_type" => $aircraft_type,
            ]);
		}

		foreach ( $query->posts as $post ) {
            $seller = get_the_author_meta('display_name', $post->post_author);
			$aircraft_type = get_the_terms($post->ID, 'aircraft_type' )[0]->name ?? null;
            $listing_promotion = get_the_terms($post->ID, 'listing_promotion' )[0]->name ?? null;
            $price = get_field('price', $post->ID) ?? null;
            $currency_code = get_field('currency_code', $post->ID) ?? null;
            $price_tag = "call for price";
            $locale = get_locale();

            if( $price && $currency_code) {
                $fmt = numfmt_create( get_locale(), NumberFormatter::CURRENCY );
                $price_tag = numfmt_format_currency($fmt, $price, $currency_code);
                $price_tag = str_replace('.00', '', $price_tag );
            }

			$thumbnail_url = get_the_post_thumbnail_url($post->ID);
			$thumbnail_url  = ( ! empty($thumbnail_url)  ) ? $thumbnail_url : get_field('gallery', $post->ID)[0]['url'];
            $thumbnail_url = ( ! empty($thumbnail_url) ) ? $thumbnail_url : get_theme_file_uri() . '/dist/images/no-photo.jpg';
			$condition = get_field('condition', $post->ID) ?? null;
			$description = get_field('description', $post->ID) ?? null;
			$city = get_field('city', $post->ID) ?? null;
			$state = get_field('state', $post->ID) ?? null;
			$manufacturer = get_field('manufacturer', $post->ID) ?? null;
			$model = get_field('model', $post->ID) ?? null;
            $year = get_field('year', $post->ID) ?? null;
			$serial_number = get_field('serial_number', $post->ID) ?? null;
			$registration_number = get_field('registration_number', $post->ID) ?? null;
			$total_time = get_field('total_time', $post->ID) ?? null;
			$useful_load = get_field('useful_load', $post->ID) ?? null;
			$maintenance_tracking_url = get_field('maintenance_tracking_url', $post->ID) ?? null;
			$airframe_notes = get_field('airframe_notes', $post->ID) ?? null;
			$number_of_seats = get_field('number_of_seats', $post->ID) ?? null;
			$wifi = get_field('wifi', $post->ID) ?? null;
			$interior_notes = get_field('interior_notes', $post->ID) ?? null;
			$exterior_notes = get_field('exterior_notes', $post->ID) ?? null;

			if($city && $state) {
				$location = $city. ', ' . $state;
			}

			$res['posts'][] =
				[
					"title"        => $post->post_title,
                    "seller" => $seller,
                    'posts_per_page' => $posts_per_page,
                    "listing_promotion" => $listing_promotion,
                    "category" => $aircraft_type,
					"thumbnail_url" => $thumbnail_url,
					"post_content" => $post->post_content,
					"condition" => $condition,
					"description" =>  $description,
					"city"   => $city,
					"state" => $state,
					"manufacturer"  => $manufacturer,
					"model"  => $model,
                    "year" => $year,
					"serial_number" => $serial_number,
					"registration_number" => $registration_number,
					"total_time" => $total_time,
					"aircraft_type" => $aircraft_type,
					"price" => $price,
                    "price_tag" => $price_tag,
					"post_status"  => $post->post_status,
					"location"  => $location,
                    "locale" => $locale,
                    "currency_code" => $currency_code,
				];
		}

		return rest_ensure_response( $res );
	}
}

$get = new GetListings();
