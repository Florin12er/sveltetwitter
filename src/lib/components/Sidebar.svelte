<script lang="ts">
  import { page } from '$app/stores';
  import { user, logout } from '$lib/stores/authStore';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import PostModal from './PostModal.svelte';
  import Icon from '@iconify/svelte';
  import { createTweet } from '$lib/api';
  import { goto } from '$app/navigation';

  $: menuItems = [
    { icon: 'mdi:home', label: 'Home', href: '/' },
    { icon: 'mdi:magnify', label: 'Explore', href: '/explore' },
    ...$user ? [{ icon: 'mdi:account', label: 'Profile', href: '/profile' }] : [],
  ];

  let showPostModal = false;

  function openPostModal() {
    showPostModal = true;
  }

  function closePostModal() {
    showPostModal = false;
  }
async function handleTweet(event: CustomEvent) {
    try {
        const newTweet = await createTweet(event.detail.content);
        console.log('New tweet created:', newTweet);
        // You might want to update your local state or trigger a refresh of the tweets list here
        closePostModal();
    } catch (error) {
        console.error('Error creating tweet:', error);
        // Handle the error (e.g., show an error message to the user)
    }
}


  function handleLogout() {
    logout();
    goto('/login');
  }
</script>

<!-- Desktop Sidebar -->
<div class="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 flex-col py-6 px-4 bg-base-200 text-base-content z-20 overflow-y-auto">
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-primary">TweetClone</h1>
  </div>
  <nav class="flex-1">
    <ul class="space-y-2">
      {#each menuItems as item}
        <li>
          <a
            href={item.href}
            class="flex items-center px-4 py-3 text-lg hover:bg-base-300 rounded-full transition-colors duration-200 {$page.url.pathname === item.href ? 'bg-base-300 text-primary' : ''}"
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            <Icon icon={item.icon} width="24" height="24" class="mr-3" />
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="mt-6 space-y-4">
    {#if $user}
      <button
        on:click={openPostModal}
        class="btn btn-primary w-full text-lg py-3"
      >
        Post
      </button>
      <button on:click={handleLogout} class="btn btn-outline btn-primary w-full text-lg py-3">
        Logout
      </button>
    {:else}
      <a href="/login" class="btn btn-primary w-full text-lg py-3">
        Login
      </a>
      <a href="/register" class="btn btn-outline btn-primary w-full text-lg py-3">
        Register
      </a>
    {/if}
    <ThemeSwitch />
  </div>
</div>

<!-- Mobile Bottom Navigation -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 shadow-lg z-20">
  <nav class="flex justify-between items-center px-4 py-2">
    {#each menuItems as item}
      <a
        href={item.href}
        class="flex flex-col items-center p-2 hover:text-primary {$page.url.pathname === item.href ? 'text-primary' : ''}"
        aria-current={$page.url.pathname === item.href ? 'page' : undefined}
      >
        <Icon icon={item.icon} width="24" height="24" />
        <span class="text-xs mt-1">{item.label}</span>
      </a>
    {/each}
    {#if $user}
      <button
        on:click={openPostModal}
        class="btn btn-primary btn-circle"
        aria-label="Create new post"
      >
        <Icon icon="mdi:plus" width="24" height="24" />
      </button>
    {:else}
      <a
        href="/login"
        class="flex flex-col items-center p-2 hover:text-primary"
      >
        <Icon icon="mdi:login" width="24" height="24" />
        <span class="text-xs mt-1">Login</span>
      </a>
    {/if}
    <div class="dropdown dropdown-top dropdown-end">
      <button 
        class="btn btn-ghost btn-circle"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Icon icon="mdi:menu" width="24" height="24" />
      </button>
      <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><ThemeSwitch /></li>
        {#if $user}
          <li><button on:click={handleLogout}>Logout</button></li>
        {:else}
          <li><a href="/register">Register</a></li>
        {/if}
      </ul>
    </div>
  </nav>
</div>

{#if showPostModal}
  <PostModal on:close={closePostModal} on:tweet={handleTweet} />
{/if}
