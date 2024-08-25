<script lang="ts">
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let message = '';

  async function handleResetRequest() {
    try {
      const response = await fetch('/reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        message = data.message;
      setTimeout(() => goto('/reset-password'), 3000); 

      } else {
        message = data.error || 'An error occurred';
      }
    } catch (error) {
      console.error('Reset request error:', error);
      message = 'An error occurred during the reset request';
    }
  }
</script>

<div class="flex min-h-screen">
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
          Reset Your Password
        </h2>
      </div>
      {#if message}
        <div class="bg-info text-info-content p-3 rounded-md">
          {message}
        </div>
      {/if}
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleResetRequest}>
        <div>
          <label for="email" class="sr-only">Email address</label>
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
              class="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:email-send" class="h-5 w-5 mr-2" />
            Send Reset Link
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-base-content/70">
        Remember your password?
        <a href="/login" class="font-medium text-primary hover:text-primary-focus">
          Sign in here
        </a>
      </p>
    </div>
  </div>
</div>
