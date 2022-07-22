// Import Components
import {render as Posts, clear as clearPosts} from "./Posts";

// Import configs
import {state, setState} from "../state";
import {getEl, createEl} from "../helpers";
import {singlePostMount, backBtn} from "../config";

export function render() {
    const aircraft = createEl("div");
    aircraft.classList.add("article pt-0 single-post")
    aircraft.innerHTML = `
    <div class="article-inner">
        <div class="container mx-auto">
            <div class="do-3">
                <main class="md:col-span-2">
                    <div class="the-title row">
                        <h1>1992 GULFSTREAM GIV-SP</h1>

                        <div class="product-tag">
                            <span>Jet  –  Used</span>
                        </div>

                        <div class="the-price">
                            <span>$12,480,000</span>
                        </div>
                    </div>
                    <div class="do-4">
                        <div class="main-content col-span-3">
                            <div class="the-content  mb-[20px] lg:mb-[60px]">
                                <p>
                                    This 16-passenger configuration offers a full-service aft galley, three separate
                                    seating areas, and an aft lavatory.

                                <p>Forward cabin features a four (4) place divan opposite a two (2) place club with fold
                                    out table.

                                <p> Mid cabin features a conference seating with four (4) seats, a folding hi-low table,
                                    and an opposing credenza for storage needs.

                                <p> Aft cabin features a four (4) place divan opposite a two (2) place club with fold
                                    out table and a large aft lavatory including a vanity sink and ample storage.

                                <ul>
                                    <li>US Based and Registered</li>
                                    <li>Fresh Engine Midlife Inspection</li>
                                    <li>Fresh 72 Month Inspection</li>
                                    <li>Gogo Biz ATG-4000 US Domestic Internet</li>
                                    <li>Low Total Time for Vintage</li>
                                    <li>FAR 135 Ready</li>
                                </ul>
                                <p></p> Maintenance tracking: http://maintenancetracking.com/23420932304
                            </div>
                        </div>
                        <div class="meta mb-[60px]">
                            <div class="field">
                                <div class="field-name">
                                    <h4>Location</h4>
                                </div>
                                <div class="field-value">
                                    <span>Chattanooga, TN</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Number of Seats</h4>
                                </div>
                                <div class="field-value">
                                    <span>4</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Total Time</h4>
                                </div>
                                <div class="field-value">
                                    <span>9,552.00</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Total Landings</h4>
                                </div>
                                <div class="field-value">
                                    <span>2,324</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Registration No.</h4>
                                </div>
                                <div class="field-value">
                                    <span>N999AH</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Serial No</h4>
                                </div>
                                <div class="field-value">
                                    <span>1195</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Useful Load (LBS)</h4>
                                </div>
                                <div class="field-value">
                                    <span>25,200</span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="field-name">
                                    <h4>Next Annual Due</h4>
                                </div>
                                <div class="field-value">
                                    <span>June 4, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-4  mb-[60px] lg:mb-0">
                        <div class="accordian">
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>ENGINE 1</span>

                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>

                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>ENGINE 2</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>ENGINE 3</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>PROPS</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>ENGINE PROGRAM</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>AUXILLARY POWER UNIT</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>AVIONICS</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>EXTERIOR</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                            <div class="accord-dd">
                                <div class="accord-dd-label">
                                    <span>INTERIOR</span>
                                    <i class="fa-solid fa-angle-up"></i>
                                </div>
                                <div class="accord-content">Lorem ipusum dolor</div>
                            </div>
                        </div>
                    </div>
                </main>
                <div class="main-sidebar">
                    <div class="form-wrapper">
                        <div class="form">
                            <div class="form-inner">
                                <div class="form-header">

                                    <div class="form-message">
                                        <h3>SOLD BY</h3>
                                    </div>
                                    <div class="form-logo"><img src="../static/images/jet-edge.jpg" alt="company logo"/>
                                    </div>


                                    <div class="verified">
                                        <img src="../static/images/check-red.png"/> <span>JET EDGE PARTNERS</span>
                                    </div>

                                    <div class="form-message">
                                        <h3>INQUIRE FOR DETAILS</h3>
                                    </div>
                                </div>

                                <form class="inquiry">
                                    <input placeholder="Full Name" type="text">
                                    <input placeholder="Email" type="text">
                                    <input placeholder="Phone Numnber" type="text">
                                    <textarea rows="10"></textarea>
                                    <button>Send Message</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;

    article.querySelect(`#${backBtn}`).addEventListener('click', eventt  => {
        event.preventDefault();
        setState("post", null);
        Posts();
    })

    clearPosts();

    getEl(singlePostMount).append(aircraft);
}

