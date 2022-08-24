<?php

include( plugin_dir_path( __FILE__ ) . '/interfaces/PostFormatter.php' );

class GetAccountListings implements PostFormatter {
    const DEFAULT_THUMBNAIL_PATH = '/dist/images/no-photo.jpg';
    const DEFAULT_PRICE_TAG = 'Call for price';

	/*
	 * Class constructor
	 */
	public function __construct() {
		$this->boot();
	}

	/*
	 * add our actions
	 */
	public function boot() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/*
	 * Register routes
	 */
	public function register_routes() {
		$namespace = 'marketplace/v1';
		$route     = 'get_account_listings';

		register_rest_route( $namespace, $route, array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ $this, 'get_account_listings' ]
		) );
	}

	/**
	 * Make sure the user has signed up for the marketplace
     *
	 * @param $user_id
	 * @param $role_name
	 *
	 * @return bool
	 */
	private function user_has_role($user_id, $role_name) {
			$user_meta = get_userdata($user_id);
			$user_roles = $user_meta->roles;

			return in_array($role_name, $user_roles);
	}

	/**
	 * Get the listings for the specific user, by status and post type
	 *
	 * @param WP_REST_Request
     *
     * @return object
	 */
	public function get_account_listings(\WP_REST_Request $request)  {
		$params = $request->get_query_params();
		$user_id = $params['user_id'] ?? '';
		$post_status = $params['post_status'] ??  'any';

        // TODO: lets just include all post types for now on the account listings page
		//$post_type = $params['post_type'] ? explode(',', $params['post_type']) : ['aircraft', 'real_estate'];

		if (! $user_id ) {
			return new WP_REST_Response([
				"error" => "Missing user_id",
			]);
		}

		if ( ! $this->user_has_role($user_id, 'marketplace') ) {
			return new WP_REST_Response([
				"error" => "User is not a member of the marketplace",
			]);
		}

		$args = [
			'author' => $user_id,
			'post_status' => $post_status,
			'post_type' => ['aircraft', 'real_estate']
		];

		$query = new \WP_Query($args);

		if  ( ! $query->found_posts ) {
			return new WP_REST_Response([
				"message" => "No found listings",
			]);
		}

        $posts = [];

        foreach($query->posts as $post) {
            $price = get_field('price', $post->ID);
            $currency_code = get_field('currency_code', $post->ID) ?? null;
            $post_type = get_post_type($post->ID);
            $thumbnail_url = $this->generate_thumbnail_url($post->ID);
            $account_name = $this->get_account_name($post->post_author);
            $listing_promotion = $this->get_listing_promotion($post->ID);
            $category = $this->get_marketplace_category($post->ID, $post_type);
            $price_tag = $this->generate_price_tag($price, $currency_code);

            $new_post = [
                "ID" => $post->ID,
                "title" => $post->post_title,
                "account_name" => $account_name,
                "listing_promotion" => $listing_promotion,
                "category" => $category,
                "thumbnail_url" => $thumbnail_url,
                "post_status"  => $post->post_status,
                "price_tag" => $price_tag,
            ];

            array_push($posts, $new_post);
        }

		$account_listings = new WP_REST_Response($posts);

		return rest_ensure_response($account_listings);
	}

    /**
     * If there isn't a featured image, grab the first gallery image. Then we get the URL.
     *
     * @param int $post_id
     * @return string|null
     */
    public function generate_thumbnail_url(int $post_id): ?string
    {
        if ($thumbnail_url = get_the_post_thumbnail_url($post_id)) {
            return $thumbnail_url;
        }

        $gallery = get_field('gallery', $post_id);

        if( ! $gallery ) {
            return get_theme_file_uri() . self::DEFAULT_THUMBNAIL_PATH;
        }

        return $gallery[0]['url'];
    }

    /**
     * This is the username in WordPress
     *
     * @param int $author_id
     * @return string
     */
    public function get_account_name(int $author_id): string
    {
        return get_the_author_meta('display_name', $author_id);
    }

    /**
     * Which package has the account signed up for?
     *
     * @param int $post_id
     * @return string|null
     */
    public function get_listing_promotion(int $post_id): ?string
    {
        if ( ! ($promotion = get_the_terms( $post_id, 'listing_promotion' )) ) {
            return null;
        }

        return $promotion[0]->name;
    }

    /**
     * Let's generate the price tag string before it gets to the frontend.
     *
     * @param mixed $price
     * @param string $currency_code
     * @return string
     */
    public function generate_price_tag($price, string $currency_code = 'USD'): string
    {
        if ( ! $price  ) {
            return self::DEFAULT_PRICE_TAG;
        }

        $fmt = numfmt_create( get_locale(), NumberFormatter::CURRENCY );
        $price_tag = numfmt_format_currency($fmt, $price, $currency_code);

        return str_replace('.00', '', $price_tag );
    }

    /**
     * This will return the proper category depending on posttype as there are multiple possible taxonomies.
     *
     * @param int $post_id
     * @param string $post_type
     * @return string|null
     */
    public function get_marketplace_category(int $post_id, string $post_type): ?string
    {
        $taxMappings = [
            "aircraft" => "aircraft_type",
            "real_state" => "real_estate_type",
        ];

        if ( ! $post_id || ! $post_type ) {
            return null;
        } else if (! ($terms = get_the_terms( $post_id, $taxMappings[$post_type] ))) {
            return null;
        }

        return $terms[0]->name;
    }
}

$account_listings = new GetAccountListings();
