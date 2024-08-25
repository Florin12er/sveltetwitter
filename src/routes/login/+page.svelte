<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';

  let username = '';
  let password = '';

  function handleLogin() {
    console.log('Login attempted with:', { username, password });
    goto('/');
  }
</script>

<div class="flex min-h-screen">
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:account" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                bind:value={username}
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                bind:value={password}
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:login" class="h-5 w-5 mr-2" />
            Sign in
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-base-content/70">
        Don't have an account?
        <a href="/register" class="font-medium text-primary hover:text-primary-focus">
          Register here
        </a>
      </p>
    </div>
  </div>
</div>
