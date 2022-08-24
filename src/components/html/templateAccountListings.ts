import { Post } from "../../interfaces/Post";

export function templateAccountListings(post: Post) : string  {
    return `
<div class="item-wrapper">
    <div class="item listing-card">
        <div class="item-image" style="background: url(${post.thumbnail_url}); background-size: cover;">
            <a class="item-image-link" href="">

            </a>
        </div>
        <div class="item-content">
            <div class="product-tag mb-5px">
                <span>${post.category} ${post.year ? '- ' + post.year : '' }</span>
            </div>
            <div class="item-body">
                <h4 class="m-0"><a href="#">${post.title}</a></h4>
                <div class="item-company">
                    <p class="caption">${post.seller}</p>
                </div>
            </div>
            <div class="price">
                <span class="tagged">${post.price_tag}</span>
            </div>
            <div class="item-status">
                <span class="button button-small">ACTIVE</span>
                <span class="button button-small">PREMIUM + PRINT</span>
            </div>
        </div>

    </div>
    <div class="item-edit">
        <a class="button">Edit</a>
    </div>
`;
}