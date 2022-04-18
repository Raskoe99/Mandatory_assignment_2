<script>
    import { user, baseUrl } from "../../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"
    import { toasts } from "svelte-toasts";

    const loginUrl = $baseUrl + "/auth/login"
    const navigate = useNavigate()
    const location = useLocation()

    let username
    let password

    async function handleSubmit(e) {
        e.preventDefault()

        let userInput = {username : username, password : password}
        await fetch(loginUrl, {method : "POST", headers: {
                "Content-type": "application/json"
            }, body : JSON.stringify(userInput)})
            .then(response => response.json())
            .then(data => {
                const backendInput = data
                if(backendInput.isLoggedIn) {
                    $user = backendInput
                    const from = ($location.state && $location.state.from) || "/profile"
                    navigate(from, { replace: true })
                    toasts.success("Login successful, welcome " + $user.userInfo.username)
                } else {
                    toasts.warning("Username or password is incorrect")
                }
            }
        )
    }    
</script>

<main class="mainBody">
    <div>
        <form on:submit={handleSubmit}>
                
            <input
                bind:value={username}
                type="text"
                name="username"
                placeholder="Username"
                required
            />  
            <br/>
            <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <br/>
            <button type="submit">Login</button>
        </form>
        <br/>
        <Link to="/forgotPassword">Forgot password?</Link>
        <br/><br/>
    </div>
    <Link to="/signup">Or sign up!</Link>
    <br/>
</main>