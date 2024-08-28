<script lang="ts">
  import { onMount } from 'svelte';
  import { setContext } from 'svelte';
  import Tweet from '$lib/components/Tweet.svelte';

  export let data;

  // Set the authentication status in the context
  setContext('authenticated', data.authenticated);

  let tweets: any[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;
  let error: string | null = null;

  async function fetchTweets(page: number = 1) {
    isLoading = true;
    try {
      const response = await fetch(`/api/tweets?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        tweets = data.tweets;
        totalPages = data.totalPages;
        currentPage = data.currentPage;
      } else {
        error = 'Failed to fetch tweets';
      }
    } catch (err) {
      console.error('Error fetching tweets:', err);
      error = 'An error occurred while fetching tweets';
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchTweets();
  });

  function loadMoreTweets() {
    if (currentPage < totalPages) {
      fetchTweets(currentPage + 1);
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-primary">Home</h1>
  
  {#if isLoading && tweets.length === 0}
    <div class="flex justify-center items-center h-32">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  {:else if error}
    <div class="alert alert-error">{error}</div>
  {:else}
    <div class="space-y-4">
      {#each tweets as tweet (tweet.id)}
        <Tweet {...tweet} />
      {/each}
    </div>

    {#if currentPage < totalPages}
      <div class="mt-4 text-center">
        <button class="btn btn-primary" on:click={loadMoreTweets}>
          Load More
        </button>
      </div>
    {/if}
  {/if}
</div>
