export interface Aircraft {
    title: string,
    seller?: string
    category?: string,
    year?: number,
    price?: number,
    permalink?: string,
    thumbnail_url?: string,
    listing_promotion?: string,
    price_tag?: string,
    condition?: string,
    model?: string,
    manufacturer?: string,
    currency_code?: string,
    description?: string,
    gallery?: string,
    city?: string,
    state?: string,
    country?: string,
    serial_number?: string,
    registration_number?: string
    total_time?: number,
    total_landings?: string,
    useful_load?: string,
    maintenance_tracking_url?: string,
    airframe_notes?: string,
    num_seats?: number,
    wifi?: any,
    avionics_information?:  string,
}