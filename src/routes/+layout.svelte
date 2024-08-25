<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { page } from '$app/stores';

  $: showSidebar = $page.route.id !== '/complete-profile';
</script>

<div class="flex min-h-screen bg-base-100">
  {#if showSidebar}
    <Sidebar />
  {/if}
  <main class="flex-1 {showSidebar ? 'lg:ml-64' : ''}">
    <slot />
  </main>
</div>
