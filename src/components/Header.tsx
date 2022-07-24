export const Header = () => {
    <header className="nav-header">
        <div className="container nav-container">
            <div className="nav-row">
                <div className="logo">
                    <a className="" href="">
                        <img src="../static/images/flying-markets.svg"
                             alt="FLYING Marketplace"/>
                    </a>
                </div>
                <nav className="main-nav">
                    <ul className="main-menu">
                        <li><a href="">BUY</a></li>
                        <li><a href="">SELL</a></li>
                    </ul>
                    <ul className="user-login">
                        <li><a className="login"><i className="fa-solid fa-user-large"></i></a></li>
                        <li><a className="logout"></a></li>
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
    </header>
}
