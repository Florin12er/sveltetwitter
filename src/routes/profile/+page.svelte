<script lang="ts">
  import { onMount } from 'svelte';
  import { token, user as userStore } from '$lib/stores/authStore';
  import Tweet from '$lib/components/Tweet.svelte';
  import EditProfileModal from '$lib/components/EditProfileModal.svelte';
  import Icon from '@iconify/svelte';
  import { get } from 'svelte/store';
  import DOMPurify from 'dompurify';

  interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio: string | null;
    location: string | null;
    website: string | null;
    profilePicture: string | null;
  }

  interface Tweet {
    id: string;
    content: string;
    username: string;
    profilePicture: string | null;
    likes: number;
    retweets: number;
    timestamp: string;
  }

  let user: User | null = null;
  let error = '';
  let showEditModal = false;
  let tweets: Tweet[] = [];

  onMount(async () => {
    await fetchUserData();
    await fetchUserTweets();
  });

  async function fetchUserData() {
    const currentToken = get(token);
    if (!currentToken) {
      error = 'Not authenticated';
      return;
    }

    try {
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });

      if (response.ok) {
        user = await response.json();
        userStore.set(user);
      } else {
        const data = await response.json();
        error = data.error || 'Failed to fetch user data';
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      error = 'An error occurred while fetching user data';
    }
  }

  async function fetchUserTweets() {
    const currentToken = get(token);
    if (!currentToken) {
      error = 'Not authenticated';
      return;
    }

    try {
      const response = await fetch('/api/user/tweets', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });

      if (response.ok) {
        const rawTweets: Tweet[] = await response.json();
        tweets = rawTweets.map(tweet => ({
          ...tweet,
          content: DOMPurify.sanitize(tweet.content)
        }));
      } else {
        const data = await response.json();
        error = data.error || 'Failed to fetch user tweets';
      }
    } catch (err) {
      console.error('Error fetching user tweets:', err);
      error = 'An error occurred while fetching user tweets';
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  function openEditModal() {
    showEditModal = true;
  }

  function handleCloseModal() {
    showEditModal = false;
  }

  async function handleSaveProfile(event: CustomEvent) {
    // Implement profile update logic here
    // After successful update, refetch user data
    await fetchUserData();
    showEditModal = false;
  }
</script>
{#if error}
    <div class="alert alert-error">{error}</div>
{:else if user}
    <div class="container mx-auto px-4 py-8 max-w-4xl text-base-content">
        <div class="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
            <figure class="h-64">
                <img src={user.profilePicture || 'https://picsum.photos/1000/300'} alt="Profile Banner" class="w-full object-cover" />
            </figure>
            <div class="card-body relative">
                <div class="absolute -top-16 left-6">
                    <div class="avatar">
                        <div class="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            <img src={user.profilePicture || 'https://i.pravatar.cc/200'} alt={user.fullName} />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button on:click={openEditModal} class="btn btn-primary btn-outline">
                        <Icon icon="mdi:pencil" class="mr-2" />Edit Profile
                    </button>
                </div>
                <h2 class="card-title text-3xl mt-8 text-primary">{user.fullName}</h2>
                <p class="text-lg text-base-content/70">@{user.username}</p>
                <p class="mt-2">{user.bio}</p>
                <div class="stats shadow mt-4">
                    <div class="stat">
                        <div class="stat-figure text-primary">
                            <Icon icon="mdi:twitter" width="24" height="24" />
                        </div>
                        <div class="stat-title">Tweets</div>
                        <div class="stat-value text-primary"></div>
                    </div>
                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <Icon icon="mdi:account-group" width="24" height="24" />
                        </div>
                        <div class="stat-title">Followers</div>
                        <div class="stat-value text-secondary"></div>
                    </div>
                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <Icon icon="mdi:account-plus" width="24" height="24" />
                        </div>
                        <div class="stat-title">Following</div>
                        <div class="stat-value text-accent"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div class="flex items-center space-x-2">
                        <div class="badge badge-primary badge-outline">
                            <Icon icon="mdi:email" width="16" height="16" />
                        </div>
                        <a href={`mailto:${user.email}`} class="link link-primary">{user.email}</a>
                    </div>
                    {#if user.location}
                        <div class="flex items-center space-x-2">
                            <div class="badge badge-secondary badge-outline">
                                <Icon icon="mdi:map-marker" width="16" height="16" />
                            </div>
                            <span class="text-sm">{user.location}</span>
                        </div>
                    {/if}
                    {#if user.website}
                        <div class="flex items-center space-x-2">
                            <div class="badge badge-accent badge-outline">
                                <Icon icon="mdi:web" width="16" height="16" />
                            </div>
                            <a href={user.website} target="_blank" rel="noopener noreferrer" class="link link-accent">
                                {user.website}
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
          <div class="divider text-2xl my-8">Recent Tweets</div>
  <div class="space-y-4">
    {#if tweets.length > 0}
      {#each tweets as tweet (tweet.id)}
        <Tweet
          profilePicture={tweet.profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${tweet.username}`}
          id={tweet.id}
          username={tweet.username}
          content={tweet.content}
          likes={tweet.likes}
          retweets={tweet.retweets}
          timestamp={formatDate(tweet.timestamp)}
        />
      {/each}
    {:else}
      <p class="text-center text-base-content/70">No tweets yet.</p>
    {/if}
  </div>
    </div>
{:else}
    <div class="flex justify-center items-center h-screen">
        <div class="loading loading-spinner loading-lg"></div>
    </div>
{/if}

{#if showEditModal}
    <EditProfileModal 
        user={user} 
        on:close={handleCloseModal} 
        on:save={handleSaveProfile} 
    />
{/if}
