<script lang="ts">
	export let form: any;
	export let errors: any;

	$: console.log(form, errors);
</script>

<form method="POST">
	<div class="mb-4">
		<label for="email" class="mb-2 block text-sm font-bold text-white">Email</label>
		<input
			type="email"
			name="email"
			id="email"
			class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none"
		/>
	</div>
	<div class="mb-4">
		<label for="password" class="mb-2 block text-sm font-bold text-white">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none"
		/>
	</div>
	<div class="mb-4">
		<label for="passwordConfirm" class="mb-2 block text-sm font-bold text-white"
			>Confirm Password</label
		>
		<input
			type="password"
			name="passwordConfirm"
			id="passwordConfirm"
			class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none"
		/>
	</div>
	<button
		type="submit"
		class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>Register</button
	>
</form>
