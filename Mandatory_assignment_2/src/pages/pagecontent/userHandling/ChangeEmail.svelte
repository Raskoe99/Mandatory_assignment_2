<script>
    import { user, baseUrl, companyEmail, mailerUrl } from "../../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"
    import { toasts } from "svelte-toasts";

    const changeEmailUrl = $baseUrl + "/auth/changeEmail"
    const navigate = useNavigate()
    const location = useLocation()

    let password
    let email
    let newEmail

    async function sendConfirmEmail(email) {
        const confirmationEmail = {
            fromEmail : $companyEmail,
            receiveEmail : email,
            subject : "Your email has now been changed",
            text : "This is an automated email;\n" + 
            "Your new mail has now been successfully changed. No further action is required.\n\n" +
            "Contact us via our company email further inquires, or if there has been a mistake."
        }

        await fetch($baseUrl + $mailerUrl, {method : "POST", headers: {
                    "Content-type": "application/json"
                    }, body : JSON.stringify(confirmationEmail)
                })
                .then(response => response.json())
                .then(data => {
                const success = { passed : data.passed }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let userInput = { username : $user.userInfo.username, password : password, email : newEmail }
        await fetch(changeEmailUrl, {method : "POST", headers: {
                "Content-type": "application/json"
            }, body : JSON.stringify(userInput)})
            .then(response => response.json())
            .then(data => {
                const backendInput = { isUpdated : data.isUpdated }
                if(backendInput.isUpdated) {
                    const from = ($location.state && $location.state.from) || "/profile"
                    navigate(from, { replace: true })
                    sendConfirmEmail(newEmail)
                    toasts.success("Your email has successfully been updated")
                } else {
                    toasts.error("Something went wrong, please check email and password")
                }
            })    
    }    
</script>

<main class="mainBody">
    <br/>
    <p>Please insert old and new email, as well as password for confirmation</p>
    <div>
        <form on:submit={handleSubmit}>
            <p>Confirm identity, insert user password</p>
            <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <p>Email</p>
            <input
                bind:value={email}
                type="text"
                name="email"
                placeholder="email@example.com"
                required
            />
            <p>New email</p>
            <input
                bind:value={newEmail}
                type="text"
                name="newEmail"
                placeholder="email@example.com"
                required
            />
            
            {#if email == newEmail}
            <p style="color:red">New email can't be old email</p>
            <br/>
            {:else if email == "" || newEmail == "" }
            <p></p>
            {:else if email !== newEmail}
            <br/>
            <button type="submit">Change email</button>  
            {/if}
            <br/><br/>
        </form>
    </div>
    <Link to="/profile">Cancel</Link>
    <br/>
</main>