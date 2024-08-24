<script lang="ts">
  import { onMount } from 'svelte';

   const themes = [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ];
  let currentTheme: string;

  onMount(() => {
    currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
  });

  function setTheme(theme: string) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<div class="form-control w-full max-w-xs text-base-content">
  <select 
    class="select select-bordered"
    bind:value={currentTheme}
    on:change={() => setTheme(currentTheme)}
  >
    {#each themes as theme}
      <option value={theme}>
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </option>
    {/each}
  </select>
</div>
