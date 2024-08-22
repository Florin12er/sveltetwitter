<script lang="ts">
  import { page } from '$app/stores';
  import ThemeSwitch from './ThemeSwitch.svelte';

  const menuItems = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'search', label: 'Explore', href: '/explore' },
    { icon: 'user', label: 'Profile', href: '/profile' },
  ];
</script>

<!-- Desktop Sidebar -->
<div class="hidden lg:flex flex-col w-64 py-6 px-4 bg-base-200 text-base-content z-20 h-screen fixed left-0 top-0 overflow-y-auto">
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
          >
            <i class="fas fa-{item.icon} w-6 h-6 mr-3"></i>
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="mt-6 space-y-4">
    <a
      href="/post"
      class="btn btn-primary w-full text-lg py-3"
    >
      Post
    </a>
    <ThemeSwitch />
  </div>
</div>

<!-- Mobile Bottom Navigation -->
<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 shadow-lg z-20">
  <nav class="flex justify-around">
    {#each menuItems as item}
      <a
        href={item.href}
        class="flex flex-col items-center p-2 hover:text-primary {$page.url.pathname === item.href ? 'text-primary' : ''}"
      >
        <i class="fas fa-{item.icon} text-lg"></i>
        <span class="text-xs mt-1">{item.label}</span>
      </a>
    {/each}
  </nav>
</div>
