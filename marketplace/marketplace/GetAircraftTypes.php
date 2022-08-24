<?php

class GetAircraftTypes
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

        $route = 'get_aircraft_types';

        register_rest_route($namespace, $route, array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'get_aircraft_types']
        ));
    }

    public function get_aircraft_types()
    {
        $terms = get_terms('aircraft_type', [
            'hide_empty' => false,
        ]);

        if (!$terms) {
            return new WP_REST_Response([
                "error" => "No aircraft types have been added to the database yet.",
            ]);
        }

        $data['aircraft_types'] = [];

        foreach ($terms as $term) {
            array_push($data['aircraft_types'], [
                "term_id" => $term->term_id,
                "name" => $term->name,
            ]);
        }

        $response = new WP_REST_Response($data);

        return rest_ensure_response($response);
    }
}

$aircraftTypes = new GetAircraftTypes();