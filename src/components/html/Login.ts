export function LoggedInLink(state: any) {
    return `
<li class="login-parent menu-item has-children">
    <a id="loginBtn" class="login logged-in">
        <i class="fa-solid fa-user-large"></i>
    </a>
     <div class="dropdown-menu profile-menu">
        <ul>
            <li><a href="${state.siteUrl}profile.html">Profile</a></li>
            <li><a href="${state.siteUrl}accountlistings.html">Listings</a></li>
            <li><a href="">Watchlist</a></li>
            <li><a href="${state.siteUrl}settings.html">Settings</a></li>
            <li><a id="logoutBtn" class="logoutBtn" href="#">Logout</a></li>
        </ul>
    </div>
</li>
`;
}

export function LoggedOutLink(state: any) {
    return `
<li class="login-parent menu-item has-children">
    <a id="loginBtn" class="login" href="${state.siteUrl}login.html">
        Login
    </a>
</li>
`;
}
