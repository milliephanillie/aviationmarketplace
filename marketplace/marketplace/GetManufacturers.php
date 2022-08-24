<?php

class GetManufacturers
{
    public function __construct()
    {
        $this->boot();
    }

    public function boot()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes()
    {
        $namespace = 'marketplace/v1';
        $route = 'get_manufacturers';

        register_rest_route($namespace, $route, array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_manufacturers']
        ));
    }

    public function get_manufacturers(WP_REST_Request $request) {
        $args = [
            "post_status" => "publish",
            "posts_per_page" => -1,
            "post_type" => ['manufacturer']
        ];

        $query = new WP_Query($args);

        if ( ! $query->found_posts ) {
            return new WP_REST_Response(
                ["message" => "No manufacturers found",]
            );
        }

        $posts = [];

        foreach ($query->posts as $post) {
            array_push($posts, $post->post_title);
        }

        $response = new WP_REST_Response($posts);

        return rest_ensure_response($response);
    }
}

$m = new GetManufacturers();