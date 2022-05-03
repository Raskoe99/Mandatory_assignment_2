<script>
    import { user, baseUrl } from "../../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"
    import { toasts } from "svelte-toasts";

    const deleteUrl = $baseUrl + "/auth/delete"
    const navigate = useNavigate()
    const location = useLocation()

    let username
    let password

    async function handleSubmit(e) {
        e.preventDefault()

        let userInput = {username : username, password : password}
        await fetch(deleteUrl, {method : "POST", headers: {
                "Content-type": "application/json"
            }, body : JSON.stringify(userInput)})
            .then(response => response.json())
            .then(data => {
                const backendInput = { isDeleted : data.isDeleted }
                if(backendInput.isDeleted) {
                    $user = backendInput
                    const from = ($location.state && $location.state.from) || "/"
                    navigate(from, { replace: true })
                    toasts.success(userInput.username + " has successfully been deleted")
                } else {
                    toasts.error("Something went wrong, please check username and password")
                }
            })
    }    
</script>

<main class="mainBody">
    <br/>
    <p>Please confirm username and password:</p>
    <div>
        <form on:submit={handleSubmit}>
                
            <input
                bind:value={username}
                type="text"
                name="username"
                placeholder="Username"
            />  
            <br/>
            <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
            />
            <br/>
            <button type="submit">Delete user</button>
            <br/><br/><br/>
        </form>
    </div>
    <Link to="/profile">Cancel</Link>
    <br/>
</main>