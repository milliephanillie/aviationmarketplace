<?php
/*
Plugin Name: Manage Marketplace
Plugin URI:  https://www.flyingmag.com/
Description: To manage marketplace listings
Version:     1.0
Author:      1027
Author URI:  https://www.flyingmag.com/
*/

include( plugin_dir_path( __FILE__ ) . 'GetAccountListings.php' );
include( plugin_dir_path( __FILE__ ) . 'GetAircraftTypes.php' );
include( plugin_dir_path( __FILE__ ) . 'GetListings.php' );
include( plugin_dir_path( __FILE__ ) . 'GetUser.php' );
include( plugin_dir_path( __FILE__ ) . 'UpdateAircraft.php' );
include( plugin_dir_path( __FILE__ ) . 'GetManufacturers.php' );

add_action( 'init', 'add_marketplace_role' );
function add_marketplace_role() {
	$caps = [
		"edit_published_posts"   => 1,
		"upload_files"           => 1,
		"publish_posts"          => 0,
		"delete_published_posts" => 1,
		"edit_posts"             => 1,
		"delete_posts"           => 1,
	];

	add_role( 'marketplace', 'Marketplace', $caps );
}

//:Todo be sure to make the post type capabilities specific to the aircraft and real estate post types

add_action( 'admin_menu', 'create_marketplace_menu' );
function create_marketplace_menu() {
	add_menu_page(
		__( 'Manage Marketplace', 'flying' ),
		'Manage Marketplace',
		'manage_options',
		'manage-marketplace',
		'',
		'dashicons-cart',
		19
	);
}

add_action( 'init', 'create_listing_promotion_taxonomy' );
function create_listing_promotion_taxonomy() {
	$labels = array(
		'name'              => _x( 'Listing Promotion', 'Listing Promotion' ),
		'singular_name'     => _x( 'Listing Promotion', 'Listing Promotion' ),
		'search_items'      => __( 'Search Listing Promotions' ),
		'all_items'         => __( 'All Listing Promotions' ),
		'parent_item'       => __( 'Parent Listing Promotion' ),
		'parent_item_colon' => __( 'Parent Listing Promotion:' ),
		'edit_item'         => __( 'Edit Listing Promotion' ),
		'update_item'       => __( 'Update Listing Promotion' ),
		'add_new_item'      => __( 'Add New Listing Promotion' ),
		'new_item_name'     => __( 'New Listing Promotion' ),
		'menu_name'         => __( 'Listing Promotions' ),
	);

// Now register the taxonomy
	register_taxonomy( 'listing_promotion',
		array( 'aircraft', 'real_estate' ),
		array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'listing-promotion' ),
		)
	);
}

add_action( 'init', 'create_aircraft_posttype' );
function create_aircraft_posttype() {
	$slug        = 'aircraft';
	$slug_plural = 'aircraft';

	$data = array(
		'labels'              => array(
			'name'               => _x( 'Aircraft', 'post type general name' ),
			'singular_name'      => _x( 'Aircraft', 'post type singular name' ),
			'menu_name'          => _x( 'Aircraft', 'admin menu' ),
			'name_admin_bar'     => _x( 'Aircraft', 'add new on admin bar' ),
			'add_new'            => _x( 'Add New', 'Aircraft' ),
			'add_new_item'       => __( 'Add New Aircraft' ),
			'new_item'           => __( 'New Widget' ),
			'edit_item'          => __( 'Edit Aircraft' ),
			'view_item'          => __( 'View Aircraft' ),
			'all_items'          => __( 'All Aircraft' ),
			'search_items'       => __( 'Search Aircraft' ),
			'parent_item_colon'  => __( 'Parent Aircraft:' ),
			'not_found'          => __( 'No Aircraft found.' ),
			'not_found_in_trash' => __( 'No Aircraft found in Trash.' )
		),
		'public'              => false,
		'has_archive'         => false,
		'publicly_queryable'  => false,
		'exclude_from_search' => true,
		'show_ui'             => true,
		'show_in_menu'        => 'manage-marketplace',
		'rewrite'             => array( 'slug' => 'aircraft' ),
		'supports'            => array( 'title', 'author' ),
		'show_in_rest'        => true,
		'taxonomies'          => array( 'aircraft_type' ),
	);

	register_post_type(
		'aircraft',
		$data,
	);
}

add_action( 'init', 'create_aircraft_type' );
function create_aircraft_type() {
	$labels = array(
		'name'              => _x( 'Aircraft Type', 'Aircraft Types' ),
		'singular_name'     => _x( 'Aircraft Type', 'Aircraft Type' ),
		'search_items'      => __( 'Search Aircraft Types' ),
		'all_items'         => __( 'All Aircraft Types' ),
		'parent_item'       => __( 'Parent Aircraft Type' ),
		'parent_item_colon' => __( 'Parent Aircraft Type:' ),
		'edit_item'         => __( 'Edit Aircraft Type' ),
		'update_item'       => __( 'Update Aircraft Type' ),
		'add_new_item'      => __( 'Add New Aircraft Type' ),
		'new_item_name'     => __( 'New Aircraft Type' ),
		'menu_name'         => __( 'Aircraft Types' ),
	);

// Now register the taxonomy
	register_taxonomy( 'aircraft_type',
		array( 'aircraft' ),
		array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'aircraft-type' ),
		)
	);
}

add_action( 'admin_menu', 'marketplace_sub_menu' );
function marketplace_sub_menu() {
    add_submenu_page( 'manage-marketplace', 'Aircraft Types', 'Aircraft Types', 'manage_options', 'edit-tags.php?taxonomy=aircraft_type');
}


add_action( 'init', 'create_real_estate_posttype' );
function create_real_estate_posttype() {
	$data = array(
		'labels'              => array(
			'name'               => _x( 'Real Estate', 'post type general name' ),
			'singular_name'      => _x( 'Real Estate', 'post type singular name' ),
			'menu_name'          => _x( 'Real Estate', 'admin menu' ),
			'name_admin_bar'     => _x( 'Real Estate', 'add new on admin bar' ),
			'add_new'            => _x( 'Add New', 'Real Estate' ),
			'add_new_item'       => __( 'Add New Real Estate' ),
			'new_item'           => __( 'New Widget' ),
			'edit_item'          => __( 'Edit Real Estate' ),
			'view_item'          => __( 'View Real Estate' ),
			'all_items'          => __( 'All Real Estate' ),
			'search_items'       => __( 'Search Real Estate' ),
			'parent_item_colon'  => __( 'Parent Real Estate:' ),
			'not_found'          => __( 'No Real Estate found.' ),
			'not_found_in_trash' => __( 'No Real Estate found in Trash.' )
		),
		'public'              => false,
		'has_archive'         => false,
		'publicly_queryable'  => false,
		'exclude_from_search' => true,
		'show_ui'             => true,
		'show_in_menu'        => 'manage-marketplace',
		'rewrite'             => array( 'slug' => 'real-estate' ),
		'supports'            => array( 'title' ),
		'show_in_rest'        => true,
	);

	register_post_type(
		'real_estate',
		$data,
	);
}


add_action( 'init', 'create_manufacturer_posttype' );
function create_manufacturer_posttype() {
    $slug        = 'manufacturer';
    $slug_plural = 'manufacturer';

    $data = array(
        'labels'              => array(
            'name'               => _x( 'Manufacturers', 'post type general name' ),
            'singular_name'      => _x( 'Manufacturer', 'post type singular name' ),
            'menu_name'          => _x( 'Manufacturer', 'admin menu' ),
            'name_admin_bar'     => _x( 'Manufacturer', 'add new on admin bar' ),
            'add_new'            => _x( 'Add New Manufacturer', 'Manufacturer' ),
            'add_new_item'       => __( 'Add New Manufacturer' ),
            'new_item'           => __( 'New Manufacturer' ),
            'edit_item'          => __( 'Edit Manufacturer' ),
            'view_item'          => __( 'View Manufacturer' ),
            'all_items'          => __( 'All Manufacturers' ),
            'search_items'       => __( 'Search Manufacturers' ),
            'parent_item_colon'  => __( 'Parent Manufacturer:' ),
            'not_found'          => __( 'No Manufacturers found.' ),
            'not_found_in_trash' => __( 'No Manufacturer found in Trash.' )
        ),
        'public'              => false,
        'has_archive'         => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'show_ui'             => true,
        'show_in_menu'        => 'manage-marketplace',
        'rewrite'             => array( 'slug' => 'manufacturers' ),
        'supports'            => array( 'title', 'author' ),
        'show_in_rest'        => true,
    );

    register_post_type(
        'manufacturer',
        $data,
    );
}

add_action( 'init', 'create_marketplace_pages_posttype' );
function create_marketplace_pages_posttype() {
    $data = array(
        'labels'              => array(
            'name'               => _x( 'Marketplace Pages', 'post type general name' ),
            'singular_name'      => _x( 'Marketplace Page', 'post type singular name' ),
            'menu_name'          => _x( 'Marketplace Pages', 'admin menu' ),
            'name_admin_bar'     => _x( 'Marketplace Page', 'add new on admin bar' ),
            'add_new'            => _x( 'Add New Marketplace Page', 'Manufacturer' ),
            'add_new_item'       => __( 'Add New Marketplace Page' ),
            'new_item'           => __( 'New Marketplace Page' ),
            'edit_item'          => __( 'Edit Marketplace Page' ),
            'view_item'          => __( 'View Marketplace Page' ),
            'all_items'          => __( 'All Marketplace Pages' ),
            'search_items'       => __( 'Search Marketplace Pages' ),
            'parent_item_colon'  => __( 'Parent Marketplace Page:' ),
            'not_found'          => __( 'No Marketplace Pages found.' ),
            'not_found_in_trash' => __( 'No Marketplace Page found in Trash.' )
        ),
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'exclude_from_search' => true,
        'show_ui'             => true,
        'show_in_menu'        => 'manage-marketplace',
        'rewrite'             => array( 'slug' => 'marketplace' ),
        'supports'            => array( 'title', 'author' ),
        'show_in_rest'        => true,
    );

    register_post_type(
        'marketplace_pages',
        $data,
    );
}

