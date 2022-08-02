export const LoggedInLink = `
<li class="login-parent menu-item has-children">
    <a id="loginBtn" class="login logged-in">
        <i class="fa-solid fa-user-large"></i>
    </a>
     <div class="dropdown-menu profile-menu">
        <ul>
            <li><a href="/profile.html">Profile</a></li>
            <li><a href="/account-listings.html">Listings</a></li>
            <li><a href="">Watchlist</a></li>
            <li><a href="/settings.html">Settings</a></li>
            <li><a id="logoutBtn" class="logoutBtn" href="#">Logout</a></li>
        </ul>
    </div>
</li>
`;

export const LoggedOutLink = `
<li class="login-parent menu-item has-children">
    <a id="loginBtn" class="login" href="/login.html">
        Login
    </a>
</li>
`;
