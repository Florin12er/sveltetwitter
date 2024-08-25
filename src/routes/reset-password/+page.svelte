<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';

  let email = '';
  let resetCode = '';
  let newPassword = '';
  let confirmPassword = '';
  let message = '';

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      message = 'Passwords do not match';
      return;
    }

    try {
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        message = data.message;
        setTimeout(() => goto('/login'), 2000); // Redirect to login after 3 seconds
      } else {
        message = data.error || 'An error occurred';
      }
    } catch (error) {
      console.error('Reset password error:', error);
      message = 'An error occurred during password reset';
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
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleResetPassword}>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              bind:value={email}
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-base-300 placeholder-base-content/60 text-base-content rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="resetCode" class="sr-only">Reset Code</label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              required
              bind:value={resetCode}
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Reset Code"
            />
          </div>
          <div>
            <label for="newPassword" class="sr-only">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              bind:value={newPassword}
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="New Password"
            />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirm New Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              bind:value={confirmPassword}
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-base-300 placeholder-base-content/60 text-base-content rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Confirm New Password"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:lock-reset" class="h-5 w-5 mr-2" />
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
