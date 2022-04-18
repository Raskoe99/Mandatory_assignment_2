<script>
    import { user, companyEmail, baseUrl } from "../../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"
    import { toasts } from "svelte-toasts";

    const deleteUrl = $baseUrl + "/auth/forgotPassword"
    const navigate = useNavigate()
    const location = useLocation()

    let username
    let email
    let password

    async function handleSubmit(e) {
        e.preventDefault()

        async function sendConfirmEmail(email) {
        const confirmationEmail = {
            fromEmail : $companyEmail,
            receiveEmail : email,
            subject : "Resetting of password",
            text : "This is an automated email;\n" + 
            "Please click the link below to verify two-way authentication\n\n" +
            ""
        }

        await fetch(mailerUrl, {method : "POST", headers: {
                    "Content-type": "application/json"
                    }, body : JSON.stringify(confirmationEmail)
                })
                .then(response => response.json())
                .then(data => {
                const success = { passed : data.passed }
                console.log(success)
            })
        }

        let userInput = {username : username, email : email, password : password}
        await fetch(deleteUrl, {method : "POST", headers: {
                "Content-type": "application/json"
            }, body : JSON.stringify(userInput)})
            .then(response => response.json())
            .then(data => {
                const backendInput = { isUpdated : data.isUpdated }
                if(backendInput.isUpdated) {
                    const from = ($location.state && $location.state.from) || "/profile"
                    navigate(from, { replace: true })
                    toasts.success("Password has been successfully updated")
                } else {
                    toasts.error("Link has not been verified, update has been canceled")
                }
            })
    }    
</script>

<main class="mainBody">
    <br/>
    <p>Verify via two-way authentication</p>
    <div>
        <form on:submit={handleSubmit}>
            <br/>
            <button type="submit"> user</button>
            <br/><br/><br/>
        </form>
    </div>
    <Link to="/login">Cancel</Link>
    <br/>
</main>