<script>
	import FrontPage from "./pages/FrontPage.svelte";
	import { toasts, ToastContainer, FlatToast } from "svelte-toasts"
</script>

<main>
	<FrontPage/>
	<ToastContainer placement="top-right" let:data>
		<FlatToast {data}/>
	</ToastContainer>
</main>
