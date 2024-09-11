<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Tweet from '$lib/components/Tweet.svelte';
  import Icon from '@iconify/svelte';

  let user: any = null;
  let tweets: any[] = [];
  let error: string | null = null;

  async function fetchUser(username: string) {
    try {
      const response = await fetch(`/api/users/${username}`);
      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function fetchTweetsByUserId(userId: string) {
    try {
      const response = await fetch(`/api/tweets?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        return data.tweets;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tweets');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  onMount(async () => {
    try {
      const username = $page.params.username;
      user = await fetchUser(username);
      tweets = await fetchTweetsByUserId(user.id);
    } catch (err:any) {
      error = err.message;
    }
  });
</script>

<div class="max-w-2xl mx-auto mt-8">
  {#if error}
    <p class="text-error">{error}</p>
  {:else if !user}
    <p>Loading...</p>
  {:else}
    <div class="bg-base-100 shadow-lg rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="flex items-center space-x-4">
          <div class="avatar">
            <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.fullName} />
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-primary">{user.fullName}</h1>
            <p class="text-lg text-base-content/70">@{user.username}</p>
          </div>
        </div>
        <p class="mt-4 text-base-content">{user.bio}</p>
        <div class="flex space-x-4 mt-4">
          <div class="flex items-center space-x-1">
            <Icon icon="mdi:account-group" width="24" height="24" class="text-secondary" />
            <span class="text-lg font-semibold">{user.followers.length} Followers</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon icon="mdi:account-plus" width="24" height="24" class="text-accent" />
            <span class="text-lg font-semibold">{user.following.length} Following</span>
          </div>
        </div>
        <div class="mt-6">
          <button class="btn btn-primary">
            <Icon icon="mdi:account-plus" class="mr-2" width="20" height="20" />Follow
          </button>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold my-8 text-primary">Tweets</h2>

    <div class="space-y-4">
      {#each tweets as tweet (tweet.id)}
        <Tweet {...tweet} username={user.username} />
      {/each}
    </div>
  {/if}
</div>
