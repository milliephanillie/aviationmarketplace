export const Aircraft = `
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
`;
