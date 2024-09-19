<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  $: showSidebar = $page.route.id !== '/complete-profile';

  onMount(() => {
    if (browser) {
      const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (Date.now() >= payload.exp * 1000) {
            // Token has expired
            localStorage.removeItem('token');
            goto('/login'); // Redirect to login page
          }
        }
      };

      // Check on mount and set up interval
      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  });
</script>

<div class="flex min-h-screen bg-base-100">
  {#if showSidebar}
    <Sidebar />
  {/if}
  <main class="flex-1 {showSidebar ? 'lg:ml-64' : ''}">
    <slot />
  </main>
</div>
