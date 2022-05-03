<script>
    import { user, baseUrl, companyEmail, mailerUrl } from "../../components/stores.js"
    import { Link, useNavigate, useLocation } from "svelte-navigator"
    import { toasts } from "svelte-toasts"
  
    const signInUrl = $baseUrl + "/auth/signup"
    const navigate = useNavigate()
    const location = useLocation()
  
    let username
    let email
    let password
    let repeatPassword

    async function sendConfirmEmail(email) {
        const confirmationEmail = {
            fromEmail : $companyEmail,
            receiveEmail : email,
            subject : "Welcome to Furniture and You",
            text : "This is an automated email;\n" + 
            "You have been added to out list of users. We are glad to have you on board!"
        }

        console.log($mailerUrl)

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

        let userInput = {username : username, email : email, password : password}
        await fetch(signInUrl, {method : "POST", headers: {
                "Content-type": "application/json"
            }, body : JSON.stringify(userInput)
        })
        .then(response => response.json())
        .then(data => {
            const backendInput = data
            if (backendInput.isLoggedIn) {
                $user = backendInput
                sendConfirmEmail(userInput.email)
                const from = ($location.state && $location.state.from) || "/profile"
                navigate(from, { replace: true })
                toasts.success("You have successfully been added to our list of users. Welcome!")
            } else {
                toasts.warning("Username is already in use")
            }
        })
    }
</script>

<main>
    <form on:submit={handleSubmit}>
        <br/>
        <p>Choose username</p>
        <input
            bind:value={username}
            type="text"
            name="username"
            placeholder="Username"
            required
        />
        <br/><br/>
        <p>Insert email</p>
        <input
            bind:value={email}
            type="email"
            name="email"
            placeholder="Email"
            required
        />
        <br/><br/>
        <p>Choose password</p>
        <input
            bind:value={password}
            type="password"
            name="password"
            placeholder="Password"
            required
        />
        <br/>
        <p>Repeat password</p>
        <input
            bind:value={repeatPassword}
            type="password"
            name="repeatPassword"
            placeholder="Password"
            required
        />

        {#if password !== repeatPassword}
        <p style="color:red">Passwords do not match</p>
        <br/>
        {:else if password == "" || repeatPassword == "" }
        <p></p>
        {:else if password == repeatPassword}
        <br/>
        <button type="submit">Sign up</button>  
        {/if}
        <br/><br/><br/>
    </form>
    <Link to="/login">Or log in</Link>
    <br/>
</main>
