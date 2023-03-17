<script setup lang="ts">
import { ref } from 'vue';

const { $trpc } = useNuxtApp();

const router = useRouter();
const email = ref('');
const password = ref('');
const errors = ref('');
const success = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  errors.value = '';
  loading.value = true;

  if (!email.value || !password.value) {
    loading.value = false;
    errors.value = 'Please fill in all fields.';
    return;
  }

  try {
    loading.value = true;
    const { success, error } = await $trpc.auth.login.mutate({ email: email.value, password: password.value });
    if (success) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      errors.value = error;
    }
  } catch (err: any) {
    errors.value = err.message;
  } finally {
    loading.value = false;
  }
};

const handleFocus = () => {
  errors.value = '';
  success.value = false;
};

</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
      <form @submit.prevent="handleSubmit" class="bg-blue-900 bg-opacity-25 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <div class="mb-4">
          <label class="block  text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input id="email" v-model="email" type="email" placeholder="Email" required
            class="form-input w-full px-3 py-2  border rounded focus:outline-none focus:shadow-outline"
            @focus="handleFocus" />
        </div>
        <div class="mb-6">
          <label class="block  text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input id="password" v-model="password" type="password" placeholder="Password" required
            class="form-input w-full px-3 py-2  border rounded focus:outline-none focus:shadow-outline"
            @focus="handleFocus" />
        </div>
        <div v-if="errors" class="mb-4 text-red-600">
          Invalid login attempt. Please try again.
        </div>
        <div v-if="success" class="mb-4 text-green-600">
          Login successful. Redirecting...
        </div>
        <button v-if="!loading" type="submit" class="w-full btn btn-primary">
          Login
        </button>
        <button v-else class="btn loading w-full" disabled>
          Loading...
        </button>
      </form>
    </div>
  </div>
</template>
