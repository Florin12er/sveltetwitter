<script lang="ts">
  import { page } from '$app/stores';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import PostModal from './PostModal.svelte';
  import Icon from '@iconify/svelte';

  const menuItems = [
    { icon: 'mdi:home', label: 'Home', href: '/' },
    { icon: 'mdi:magnify', label: 'Explore', href: '/explore' },
    { icon: 'mdi:account', label: 'Profile', href: '/profile' },
  ];

  let showPostModal = false;

  function openPostModal() {
    showPostModal = true;
  }

  function closePostModal() {
    showPostModal = false;
  }

  function handleTweet(event: CustomEvent) {
    console.log('New tweet:', event.detail.content);
    // Here you would typically send the tweet to your backend
    closePostModal();
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
    <button
      on:click={openPostModal}
      class="btn btn-primary w-full text-lg py-3"
    >
      Post
    </button>
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
    <button
      on:click={openPostModal}
      class="btn btn-primary btn-circle"
      aria-label="Create new post"
    >
      <Icon icon="mdi:plus" width="24" height="24" />
    </button>
    <div class="dropdown dropdown-top dropdown-end">
      <button 
        class="btn btn-ghost btn-circle"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Icon icon="mdi:palette" width="24" height="24" />
      </button>
      <div class="dropdown-content z-[1] mb-2 mr-2">
        <ThemeSwitch />
      </div>
    </div>
  </nav>
</div>

{#if showPostModal}
  <PostModal on:close={closePostModal} on:tweet={handleTweet} />
{/if}
