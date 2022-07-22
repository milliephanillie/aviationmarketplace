export const Header = `
<div class="container nav-container">
        <div class="nav-row">
            <div class="logo">
                <a class="" href="">
                    <img src="../static/images/flying-markets.svg"
                         alt="FLYING Marketplace" />
                </a>
            </div>
            <nav class="main-nav">
                <ul class="main-menu">
                    <li><a href="">BUY</a></li>
                    <li><a href="">SELL</a></li>
                </ul>
                <ul class="user-login">
                    <li class="menu-item has-children"><a id="loginBtn" class="login logged-in"><i class="fa-solid fa-user-large"></i></a>
                    <div class="dropdown-menu profile-menu">
                        <ul>
                            <li><a href="/profile.html">Profile</a></li>
                            <li><a href="/page.html">Listings</a></li>
                            <li><a href="">Watchlist</a></li>
                            <li><a href="/setttings.html">Settings</a></li>
                        </ul>
                    </div> </li>
                    <li><a id="logoutBtn" class="logout hidden">Logout</a></li>
                </ul>
            </nav>
            <!--<button class="sm:hidden menu-toggle " id="menu-toggle">-->
              <!--<span class="inner">-->
                <!--<span class="lines">-->
                  <!--<span></span>-->
                  <!--<span></span>-->
                  <!--<span></span>-->
                <!--</span>-->
                <!--<span class="x">-->
                  <!--<span></span>-->
                  <!--<span></span>-->
                <!--</span>-->
              <!--</span>-->
            <!--</button>-->
        </div>
    </div>
`;
