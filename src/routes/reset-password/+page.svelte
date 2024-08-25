<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';

  let email = '';
  let resetCode = '';
  let newPassword = '';
  let confirmPassword = '';

  function handleResetPassword() {
    console.log('Reset password attempted with:', { email, resetCode, newPassword, confirmPassword });
    // In a real application, this would send a request to your backend
    // to verify the reset code and update the password
    alert('Password reset successful!');
    goto('/login');
  }
</script>

<div class="flex min-h-screen">
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
          Reset Your Password
        </h2>
        <p class="mt-2 text-center text-sm text-base-content/70">
          Enter your email, the reset code you received, and your new password.
        </p>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleResetPassword}>
        <div class="rounded-md shadow-sm -space-y-px">
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
                class="appearance-none rounded-t-md relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <label for="resetCode" class="sr-only">Reset Code</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:key" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                required
                bind:value={resetCode}
                class="appearance-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Reset Code"
              />
            </div>
          </div>
          <div>
            <label for="newPassword" class="sr-only">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock" class="h-5 w-5 text-base-content" />
              </div>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                bind:value={newPassword}
                class="appearance-none relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
            </div>
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirm New Password</label>
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
                class="appearance-none rounded-b-md relative block w-full px-3 py-2 pl-10 border border-base-300 placeholder-base-content/60 text-base-content focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:lock-reset" class="h-5 w-5 mr-2" />
            Reset Password
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-base-content/70">
        Didn't receive the code?
        <a href="/reset-request" class="font-medium text-primary hover:text-primary-focus">
          Request a new one
        </a>
      </p>
    </div>
  </div>
</div>
