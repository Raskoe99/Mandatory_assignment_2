<script>
    import { user, companyEmail } from "../components/stores.js"
    import { Router, Route, Link } from "svelte-navigator"
    import PrivateRoute from "../components/PrivateRoute.svelte"
    import ItemList from "./pagecontent/ItemList.svelte"
    import About from "./pagecontent/About.svelte"
    import Login from "./pagecontent/Login.svelte"
    import SignUp from "./pagecontent/SignUp.svelte"
    import ForgotPassword from "./pagecontent/ForgotPassword.svelte"
    import Profile from "./pagecontent/userHandling/Profile.svelte"
    import CartItems from "./pagecontent/userHandling/CartItems.svelte"
    import ChangeEmail from "./pagecontent/userHandling/ChangeEmail.svelte"
    import DeleteUser from "./pagecontent/userHandling/DeleteUser.svelte"
    
</script>
  
<Router>
<header>
    <div class="header-background">
        <div class="header">
            <img class="logo" src="img/logo-long.png" alt="Logo"/>
            <div class="container">
                <ul>
                    <nav class="nav"> 
                        <li class="link-list">
                            <div class="link-css">
                                <Link style="text-decoration: none; color: inherit;" to="/">Home</Link>
                            </div>
                            <div class="link-css">
                                <Link style="text-decoration: none; color: inherit;" to="/about">About</Link>
                            </div>
                            {#if $user.isLoggedIn}
                            <div class="link-css">
                                <Link style="text-decoration: none; color: inherit;" to="/cart">Cart</Link>
                            </div>
                            <div class="link-css">
                                <Link style="text-decoration: none; color: inherit;" to="/profile">Profile</Link>
                            </div>
                            {:else}
                            <div class="link-css">
                                <Link style="text-decoration: none; color: inherit;" to="/login">Login</Link>
                            </div>
                            {/if}
                        </li>
                    </nav>
                </ul>
            </div>
        </div>
    </div>
</header>

<main>
    <Route path="/">
        <h3>Catalogue</h3>
        <ItemList/>
    </Route>
  
    <Route path="about">
        <h3>About</h3>
        <About/>
    </Route>

    <PrivateRoute path="profile" let:location>
        <h3>User profile</h3>
        <Profile/>
    </PrivateRoute>

    <PrivateRoute path="cart" let:location>
        <h3>Shopping cart</h3>
        <CartItems/>
    </PrivateRoute>

    <Route path="login">
        <h3>Log in</h3>
        <Login/>
    </Route>
    
    <Route path="signup">
        <h3>Sign up</h3>
        <SignUp/>
    </Route>

    <PrivateRoute path="changeEmail" let:location>
        <h3>Change email</h3>
        <ChangeEmail/>
    </PrivateRoute>
    
    <PrivateRoute path="deleteAccount" let:location>
        <h3>Delete account</h3>
        <DeleteUser/>
    </PrivateRoute>
    

    <Route path="forgotPassword">
        <h3>Forgot password</h3>
        <ForgotPassword/>
    </Route>
</main>
</Router>

<footer class="footer">
    <div class="footer-content">
        <li>
            <div>
                &copy; {new Date().getFullYear()}
            </div>
            <div>
                Contact: {$companyEmail}
            </div>
        </li>
    </div>
</footer>

<style>
    *{
        padding:0;
        margin:0;
        box-sizing: border-box;
    
    }
    h3 {
        text-align: center;
    }
    .header {
        height: 100px;
        margin: 0 0 0 0;
        display: flex;
        justify-content: space-between;
        box-shadow: 3px 0 rgba(233, 246, 246, 0.82);
        border-collapse: collapse;
        background: -webkit-linear-gradient(left top, paleturquoise 0%, paleturquoise 10%, paleturquoise 10%, paleturquoise 20%,  paleturquoise 20%, paleturquoise 30%,  paleturquoise 30%, paleturquoise 40%, paleturquoise 40%, paleturquoise 50%, #07a39b 50%, #07a39b 60%, #e21c43 60%, #e21c43 70%, #9d1e62 70%, #9d1e62 80%, #fdac34 80%, #fdac34 90%, paleturquoise 90%, paleturquoise 100%);
        background: -o-linear-gradient(bottom right, paleturquoise 0%, paleturquoise 10%, paleturquoise 10%, paleturquoise 20%,  paleturquoise 20%, paleturquoise 30%,  paleturquoise 30%, paleturquoise 40%, paleturquoise 40%, paleturquoise 50%, #07a39b 50%, #07a39b 60%, #e21c43 60%, #e21c43 70%, #9d1e62 70%, #9d1e62 80%, #fdac34 80%, #fdac34 90%, paleturquoise 90%, paleturquoise 100%);
        background: -moz-linear-gradient(bottom right, paleturquoise 0%, paleturquoise 10%, paleturquoise 10%, paleturquoise 20%,  paleturquoise 20%, paleturquoise 30%,  paleturquoise 30%, paleturquoise 40%, paleturquoise 40%, paleturquoise 50%, #07a39b 50%, #07a39b 60%, #e21c43 60%, #e21c43 70%, #9d1e62 70%, #9d1e62 80%, #fdac34 80%, #fdac34 90%, paleturquoise 90%, paleturquoise 100%);
        background: linear-gradient(to bottom right, paleturquoise 0%, paleturquoise 10%, paleturquoise 10%, paleturquoise 20%,  paleturquoise 20%, paleturquoise 30%,  paleturquoise 30%, paleturquoise 40%, paleturquoise 40%, paleturquoise 50%, #07a39b 50%, #07a39b 60%, #e21c43 60%, #e21c43 70%, #9d1e62 70%, #9d1e62 80%, #fdac34 80%, #fdac34 90%, paleturquoise 90%, paleturquoise 100%);
    }
    main {
        min-height: calc(100vh-60px);
    }
    .footer {
        background-color: paleturquoise;
        left: 0;
        bottom: 0;
        height: 100px;
        width: 100%;
        overflow: hidden;
    }
    .footer-content {
        padding: 7px;
        list-style-type: none;
    }
    .logo {
        display: block;
        height:80%;
        margin-left:25px;
        margin-top:10px;
    }
    .link-list {
        display: flex;
        margin:25px 50px;
        list-style-type: none;
        padding:0;
        height:100%;
    }
    .link-css {
        text-decoration: none;
        color: inherit;
        background-color: white;
        opacity: 75%;
        font-family: "Times New Roman";
        font-size: 25px;
        display: block;
        width: 175px;
        text-align: center;
        padding:10px 0;
    }
    .link-css:hover {
        background-color: #E6E4E6;
    }
</style>