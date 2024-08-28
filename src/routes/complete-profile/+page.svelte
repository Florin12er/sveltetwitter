<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { token } from '$lib/stores/authStore';
  import { jwtDecode } from 'jwt-decode';

  let fullName = '';
  let bio = '';
  let location = '';
  let website = '';
  let errorMessage = '';

  // Decode the token to get the userId
  $: userId = $token ? jwtDecode($token) : null;

  async function handleProfileCompletion() {
    if (!userId) {
      errorMessage = 'User not authenticated';
      return;
    }

    try {
      const response = await fetch('/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${$token}`
        },
        body: JSON.stringify({ fullName, bio, location, website }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile completed successfully:', data);
        goto('/'); // Redirect to home page or user's profile
      } else {
        errorMessage = data.error || 'Failed to complete profile';
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      errorMessage = 'An error occurred while completing the profile';
    }
  }
</script>

<div class="flex min-h-screen bg-base-200">
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
          Complete Your Profile
        </h2>
      </div>
      {#if errorMessage}
        <div class="bg-error text-error-content p-3 rounded-md">
          {errorMessage}
        </div>
      {/if}
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleProfileCompletion}>
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="fullName" class="block text-sm font-medium text-base-content">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              bind:value={fullName}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label for="bio" class="block text-sm font-medium text-base-content">Bio</label>
            <textarea
              id="bio"
              name="bio"
              bind:value={bio}
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-base-content">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              bind:value={location}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label for="website" class="block text-sm font-medium text-base-content">Website (Optional)</label>
            <input
              id="website"
              name="website"
              type="url"
              bind:value={website}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">
            <Icon icon="mdi:check" class="h-5 w-5 mr-2" />
            Complete Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
