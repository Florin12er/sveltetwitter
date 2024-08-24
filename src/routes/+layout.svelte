
<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { onMount } from 'svelte';

  onMount(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  });
</script>

<div class="flex min-h-screen bg-base-100">
  <Sidebar />
  <main class="flex-1 p-6 lg:ml-64">
    <div class="max-w-4xl mx-auto">
      <slot />
    </div>
  </main>
</div>
