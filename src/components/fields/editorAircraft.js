import {editorContent} from "../../config";

export const editorAircraft = `
<!-- Listing -->
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

                <div  class="text">
                       <textarea class="form-field form-field-description" cols="10" rows="20" placeholder="Description" required></textarea>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Add Photos -->
<section class="sell-input sell-aircraft-input add-photos-input">
    <div class="container">
        <div class="small-container">
            <div class="drag-and-drop">
                <div class="dnd">
                    <div class="dnd-inner">
                        <div class="dnd-click-area">
                            <div class="dnd-body">
                                <i class="fa-solid fa-images"></i>
                                <p>Add photos or drag & drop</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Aircraft -->
<section class="sell-input sell-aircraft-input aircraft-input">
    <div class="container">
        <div class="small-container airframe form">
            <div class="section-header"><h3>Aircraft</h3></div>

            <div class="input-row">
                <div class="category">
                    <input class="form-field form-field-city" placeholder="City" type="Text">
                </div>
            </div>

            <div class="input-row">
                <div class="condition">
                    <select class="form-field form-field-state">State
                        <option disabled selected value>-- State --</option>
                        <option>Alaska</option>
                        <option>WYOMING</option>
                    </select>
                </div>
            </div>
            <div class="input-row">
                    <input class="form-field form-field-year" placeholder="Year" type="number" value="">
            </div>
            <div class="input-row">
                <input class="form-field form-field-manufacturer" required placeholder="Manufacturer" type="text" />
            </div>
            <div class="input-row">
                <input class="form-field form-field-model" required placeholder="Model" type="text" />
            </div>
            <div class="input-row">
                <input class="form-fieldform-field-serial-number" required placeholder="Serial Number" type="text" />
            </div>
            <div class="input-row">
                <input class="form-fieldform-field-registration-number" required placeholder="Registration Number" type="text" />
            </div>
        </div>
    </div>
</section>

<!-- Airframe -->
<section class="sell-input sell-aircraft-input aircraft-input">
    <div class="container">
        <div class="small-container airframe form">
            <div class="section-header"><h3>Airframe</h3></div>

            <div class="input-row">
                <div class="category">
                    <input class="form-field form-field-totaltime" placeholder="Total time (in hours)" type="Text">
                </div>
            </div>

            <div class="input-row">
                <div class="condition">
                    <input class="form-field form-field-landings" placeholder="Total landings" type="Text">
                </div>
            </div>
            <div class="input-row">
                <input class="form-field form-field-useful-load" placeholder="Useful load (in lbs)" type="number" value="">
            </div>
            <div class="input-row">
                <input class="form-field form-field-maintenance" required placeholder="Maintenance tracking  URL" type="text" />
            </div>
            <div class="text">
                <textarea class="form-field form-field-airframe-notes" cols="10" rows="10" placeholder="Airframe notes"></textarea>
            </div>
        </div>
    </div>
</section>

<!-- Options -->
<section class="sell-input sell-aircraft-input options-input">
    <div class="container">
        <div class="small-container">
            <div class="airframe form">
                <div class="section-header"><h3>Options</h3></div>

                <div class="input-row">
                    <input class="form-field form-filed-num-seats" placeholder="Number of seats" type="number" />
                </div>

                <div class="input-row">
                    <div class="checkbox-row">
                        <label for="wifi">
                        <input class="form-field form-field-wifi" name="wifi" type="checkbox" />
                        has WiFi?</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<!-- Additional Notes -->
<section class="sell-input sell-aircraft-input additional-notes-input">
    <div class="container">
        <div class="small-container airframe form">
            <div class="section-header"><h3>Additional Notes</h3><p>Limited markdown allowed for formatting.</p></div>
            <div class="input-row">
                <textarea rows="10" class="form-field form-field-interior" placeholder="Interior notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10"  class="form-field form-field-exterior" placeholder="Exterior notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10"  class="form-field form-field-engine-1" placeholder="Engine 1 notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10"  class="form-field form-field-engine-2" placeholder="Engine 2 notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10" class="form-field form-field-engine-3" placeholder="Engine 3 notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10" class="form-field form-field-avionic" placeholder="Avionic notes"></textarea>
            </div>
            <div class="input-row">
                <textarea rows="10" class="form-field form-field-prop" placeholder="Prop notes"></textarea>
            </div>
        </div>
    </div>
</section>

<!-- save-input -->
<section class="sell-input save-input">
    <div class="input-row">
        <div class="flex justify-center">
            <a data-update-type="update" class="js-update-aircraft mr-[10px] button button-red">CONTINUE</a>
            <a data-update-type="draft" class="js-save-aircraft-draft button">SAVE DRAFT</a>
        </div>
    </div>
</section>
`;