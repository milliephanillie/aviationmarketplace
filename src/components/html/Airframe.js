export const Airframe = `
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
`;
