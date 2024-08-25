<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';

  let fullName = '';
  let username = '';
  let bio = '';
  let location = '';
  let email = '';
  let website = '';
  let profilePicture: File | null = null;

  function handleProfileCompletion() {
    // Here you would typically send this data to your backend
    console.log('Profile completion attempted with:', { fullName, username, bio, location, email, website, profilePicture });
    goto('/'); // Redirect to home page after profile completion
  }

  function handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      profilePicture = target.files[0];
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
            <label for="username" class="block text-sm font-medium text-base-content">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              bind:value={username}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="johndoe"
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
            <label for="email" class="block text-sm font-medium text-base-content">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              bind:value={email}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm placeholder-base-content/60 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
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
          <div>
            <label for="profilePicture" class="block text-sm font-medium text-base-content">Profile Picture</label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              on:change={handleFileInput}
              class="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm text-base-content focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
