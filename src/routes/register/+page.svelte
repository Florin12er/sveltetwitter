<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { token } from '$lib/stores/authStore';

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';

  async function handleRegister() {
    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        token.set(data.token); // Store the token
        goto('/complete-profile');
      } else {
        errorMessage = data.error || 'Registration failed';
      }
    } catch (error) {
      console.error('Registration error:', error);
      errorMessage = 'An error occurred during registration';
    }
  }
</script>

<div class="flex min-h-screen">
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
          Create your account
        </h2>
      </div>
      {#if errorMessage}
        <div class="bg-error text-error-content p-3 rounded-md">
          {errorMessage}
        </div>
      {/if}
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
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
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:email" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                bind:value={email}
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email"
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
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock-check" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                bind:value={confirmPassword}
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:account-plus" class="h-5 w-5 mr-2" />
            Register
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-base-content/70">
        Already have an account?
        <a href="/login" class="font-medium text-primary hover:text-primary-focus">
          Sign in here
        </a>
      </p>
    </div>
  </div>
</div>
