<script lang="ts">
  import { onMount } from 'svelte';
  import Tweet from '$lib/components/Tweet.svelte';
  import User from '$lib/components/User.svelte';

  let tweets: Tweet[] = [];
  let users: User[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;
  let error: string | null = null;

  let searchTerm = '';
  let searchResults: (Tweet | User)[] = [];

  interface Tweet {
  id: string;
  username: string;
  content: string;
  likes: number;
  retweets: number;
  timestamp: string; // Add this
  profilePicture: string; // Add this
}
    interface User {
    id: string;
    username: string;
      fullName: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
  }

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

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        users = await response.json();
      } else {
        error = 'Failed to fetch users';
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      error = 'An error occurred while fetching users';
    }
  }

  function loadMoreTweets() {
    if (currentPage < totalPages) {
      fetchTweets(currentPage + 1);
    }
  }

  function search() {
    const term = searchTerm.toLowerCase();
    searchResults = [
      ...tweets.filter(
        (tweet) =>
          tweet.content.toLowerCase().includes(term) || tweet.username.toLowerCase().includes(term)
      ),
      ...users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term) ||
          user.bio.toLowerCase().includes(term)
      )
    ];
  }

  onMount(async () => {
    await Promise.all([fetchTweets(), fetchUsers()]);
    searchResults = [...tweets, ...users];
  });

  function isTweet(result: Tweet | User): result is Tweet {
    return 'content' in result;
  }

  function filterTweets(results: (Tweet | User)[]): Tweet[] {
    return results.filter((result): result is Tweet => isTweet(result));
  }

  function filterUsers(results: (Tweet | User)[]): User[] {
    return results.filter((result): result is User => !isTweet(result));
  }

  $: filteredTweets = filterTweets(searchResults);
  $: filteredUsers = filterUsers(searchResults);
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-primary">Explore</h1>
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search tweets and users"
      class="input input-bordered w-full text-primary bg-primary/10"
      bind:value={searchTerm}
      on:input={search}
    />
  </div>
  {#if isLoading}
    <p>Loading...</p>
  {:else if error}
    <p class="text-error">{error}</p>
  {:else}
    <h2 class="text-2xl font-bold mb-4 text-primary">Tweets:</h2>
    <div class="space-y-4">
      {#each filteredTweets as tweet (tweet.id)}
        <Tweet {...tweet} />
      {/each}
    </div>
    {#if currentPage < totalPages}
      <button class="btn btn-primary mt-4" on:click={loadMoreTweets}>Load More Tweets</button>
    {/if}
    <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Users:</h2>
    <div class="space-y-4">
      {#each filteredUsers as user (user.id)}
        <User {...user} />
      {/each}
    </div>
  {/if}
</div>
