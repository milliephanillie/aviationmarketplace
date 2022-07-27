export const editorListing = `
<section class="sell-input sell-aircraft-input listing-input">
    <div class="container">
        <div class="small-container">
            <div class="form">
                <div class="section-header"><h3 id="post-id" data-id="">Listing</h3></div>
                <div class="input-row">
                    <div class="category">
                        <input class="form-field form-field-title" name="title" placeholder="Title" type="text" required />
                    </div>
                </div>

                <div class="input-row">
                    <div class="category">
                        <select class="form-field form-field-category" required>Category
                            <option disabled selected value> -- Category -- </option>
                            <option>Jets</option>
                            <option>Helicoptoers</option>
                            <option>Commerical Real Estate</option>
                            <option>Residential Real Estate</option>
                        </select>
                    </div>
                </div>

                <div class="input-row">
                    <div class="Condition">
                        <select class="form-field form-field-condition" required>Condition
                            <option disabled selected value> -- Condition -- </option>
                            <option>Used</option>
                            <option>New</option>
                            <option>Commerical Real Estate</option>
                            <option>Residential Real Estate</option>
                        </select>
                    </div>
                </div>

                <div class="input-row">
                    <div class="price">
                        <div class="small-input">
                            <label>$</label><input class="form-field form-field-price" placeholder="Price (USD)" type="number" min="1" step="any" required />
                        </div>
                    </div>
                </div>

                <div class="text">
                        <textarea class="form-field form-field-description" cols="10" rows="20" placeholder="Description" required></textarea>
                </div>
            </div>
        </div>
    </div>
</section>
`;