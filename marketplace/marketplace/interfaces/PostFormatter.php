<?php

interface PostFormatter {
    public function generate_thumbnail_url(int $post_id): ?string;
    public function get_account_name(int $author_id): string;
    public function get_listing_promotion(int $post_id): ?string;
    public function generate_price_tag(int $price, string $currency_code): string;
    public function get_marketplace_category(int $post_id, string $post_type): ?string;
}