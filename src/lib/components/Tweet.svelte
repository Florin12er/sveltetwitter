<script lang="ts">
  import DOMPurify from 'dompurify';
  import { isAuthenticated } from '$lib/stores/authStore';

  export let id: string;
  export let username: string;
  export let content: string;
  export let likes: number;
  export let retweets: number;
  export let timestamp: string;
  export let profilePicture: string;

  $: sanitizedContent = DOMPurify.sanitize(content);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  function handleLike() {
    if ($isAuthenticated) {
      // Implement like functionality
      console.log('Liked tweet:', id);
    }
  }

  function handleRetweet() {
    if ($isAuthenticated) {
      // Implement retweet functionality
      console.log('Retweeted tweet:', id);
    }
  }
</script>

<div class="bg-base-100 p-4 rounded-lg shadow-md border border-base-300">
  <div class="flex items-start">
    <img src={profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${username}`} alt={username} class="w-12 h-12 rounded-full mr-4" />
    <div class="flex-grow">
      <div class="flex items-center mb-2">
        <h3 class="font-bold text-lg">{username}</h3>
        <span class="text-sm text-base-content/60 ml-2">{formatDate(timestamp)}</span>
      </div>
      <div class="tweet-content mb-4">
        {@html sanitizedContent}
      </div>
      <div class="flex items-center space-x-4">
        <button class="btn btn-sm btn-ghost" on:click={handleLike} disabled={!$isAuthenticated}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likes}
        </button>
        <button class="btn btn-sm btn-ghost" on:click={handleRetweet} disabled={!$isAuthenticated}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {retweets}
        </button>
        <a href={`/tweet/${id}`} class="btn btn-sm btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Responses
        </a>
      </div>
    </div>
  </div>
</div>
