<script>
    import { user, baseUrl } from "../../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"

    const logOutUrl = $baseUrl + "/auth/logout"
    const navigate = useNavigate()
    const location = useLocation()
    
    async function handleLogout(e) {
        e.preventDefault()

        const promise = fetch(logOutUrl).then(response => response.json())
        await promise.then(data =>{
            $user = data
            const from = ($location.state && $location.state.from) || "/login"
            navigate(from, { replace: true })
        })
    }
        
</script>

<h3>Welcome {$user.userInfo.username}</h3>
<br>

<button on:click="{handleLogout}">Log out</button>
<br/><br/>

<Link to="/changeEmail">Change email</Link>
<br/><br/>

<Link style="text-decoration: none; color: red;" to="/deleteAccount">Delete account</Link>
<br/>