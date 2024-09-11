<script lang="ts">
  import { onMount } from 'svelte';
  import { token } from '$lib/stores/authStore';
  import Tweet from '$lib/components/Tweet.svelte';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  import Icon from '@iconify/svelte';
  import { get } from 'svelte/store';
  import DOMPurify from 'dompurify';

  export let data;

  interface TweetData {
    id: string;
    content: string;
    author: {
      username: string;
      profilePicture: string | null;
    };
    likes: number;
    retweets: number;
    createdAt: string;
  }

  interface ResponseData {
    id: string;
    content: string;
    user?: {
      username: string;
      profilePicture: string | null;
    };
    author?: {
      username: string;
      profilePicture: string | null;
    };
    likes: number;
    retweets: number;
    createdAt: string;
  }

  let mainTweet: TweetData | null = null;
  let responses: ResponseData[] = [];
  let error: string | null = null;
  let showResponseEditor = false;
  let responseContent = '';
  let characterCount = 0;
  const MAX_CHARACTERS = 280;

  onMount(async () => {
    await fetchTweetData();
    await fetchResponses();
  });

  async function fetchTweetData() {
    const currentToken = get(token);
    if (!currentToken) {
      error = 'Not authenticated';
      return;
    }

    try {
      const response = await fetch(`/api/tweet/${data.id}`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });

      if (response.ok) {
        const rawTweet: TweetData = await response.json();
        mainTweet = {
          ...rawTweet,
          content: DOMPurify.sanitize(rawTweet.content),
          author: {
            ...rawTweet.author,
            profilePicture: rawTweet.author?.profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${rawTweet.author?.username || 'unknown'}`
          }
        };
      } else {
        const errorData = await response.json();
        error = errorData.error || 'Failed to fetch tweet data';
      }
    } catch (err) {
      console.error('Error fetching tweet data:', err);
      error = 'An error occurred while fetching tweet data';
    }
  }

  async function fetchResponses() {
    const currentToken = get(token);
    if (!currentToken) {
      error = 'Not authenticated';
      return;
    }

    try {
      const response = await fetch(`/api/tweet/${data.id}/responses`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });

      if (response.ok) {
        const rawResponses: ResponseData[] = await response.json();
        responses = rawResponses.map(response => ({
          ...response,
          content: DOMPurify.sanitize(response.content),
          user: response.user || response.author, 
          author: response.author || response.user 
        })).filter(response => response.user || response.author); 
      } else {
        const errorData = await response.json();
        error = errorData.error || 'Failed to fetch responses';
      }
    } catch (err) {
      console.error('Error fetching responses:', err);
      error = 'An error occurred while fetching responses';
    }
  }

  function toggleResponseEditor() {
    showResponseEditor = !showResponseEditor;
  }

  function handleEditorChange(event: CustomEvent) {
    responseContent = event.detail.content;
    characterCount = event.detail.characterCount;
  }

  async function submitResponse() {
    if (responseContent.trim() && characterCount <= MAX_CHARACTERS) {
      const currentToken = get(token);
      if (!currentToken) {
        error = 'Not authenticated';
        return;
      }

      try {
        const response = await fetch(`/api/tweet/${data.id}/responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({ content: responseContent }),
        });

        if (response.ok) {
          const newResponse: ResponseData = await response.json();
          responses = [newResponse, ...responses];
          responseContent = '';
          showResponseEditor = false;
        } else {
          const errorData = await response.json();
          error = errorData.error || 'Failed to submit response';
        }
      } catch (err) {
        console.error('Error submitting response:', err);
        error = 'An error occurred while submitting the response';
      }
    }
  }

  function formatDate(dateString: string): string {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  function getUsername(response: ResponseData): string {
    return response.user?.username || response.author?.username || 'Unknown User';
  }

  function getProfilePicture(response: ResponseData): string {
    const username = getUsername(response);
    return response.user?.profilePicture || response.author?.profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${username}`;
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl text-base-content">
  {#if error}
    <div class="alert alert-error mb-4">{error}</div>
  {/if}

  {#if mainTweet}
    <div class="card bg-base-100 mb-8">
        <Tweet
          id={mainTweet.id}
          username={mainTweet.author.username}
          content={mainTweet.content}
          likes={mainTweet.likes}
                    isResponse={false}
          retweets={mainTweet.retweets}
          timestamp={formatDate(mainTweet.createdAt)}
          profilePicture={mainTweet.author.profilePicture || `https://api.dicebear.com/6.x/initials/svg?seed=${mainTweet.author.username}`}
        />
    </div>

    <div class="mb-4">
      <button on:click={toggleResponseEditor} class="btn btn-primary">
        <Icon icon="mdi:comment-plus" class="mr-2" />
        {showResponseEditor ? 'Cancel Response' : 'Add Response'}
      </button>
    </div>

    {#if showResponseEditor}
      <div class="card bg-base-100 shadow-xl overflow-hidden border border-base-300 mb-8">
        <div class="card-body">
          <RichTextEditor
            on:change={handleEditorChange}
            maxCharacters={MAX_CHARACTERS}
            height={200}
          />
          <div class="mt-2 flex justify-between items-center">
            <span class="text-sm text-base-content/70">
              {characterCount}/{MAX_CHARACTERS} characters
            </span>
            <button
              class="btn btn-primary"
              on:click={submitResponse}
              disabled={characterCount === 0 || characterCount > MAX_CHARACTERS}
            >
              <Icon icon="mdi:send" class="mr-2" />
              Submit Response
            </button>
          </div>
        </div>
      </div>
    {/if}

    <h2 class="text-2xl font-bold mb-4 text-primary">Responses</h2>

    <div class="space-y-4">
      {#if responses.length > 0}
        {#each responses as response (response.id)}
          <Tweet
            id={response.id}
            username={getUsername(response)}
            content={response.content}
            likes={response.likes}
            retweets={response.retweets}
            timestamp={formatDate(response.createdAt)}
            profilePicture={getProfilePicture(response)}
            isResponse={true}
          />
        {/each}
      {:else}
        <p class="text-center text-base-content/70">No responses yet.</p>
      {/if}
    </div>
  {:else}
    <div class="flex justify-center items-center h-screen">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  {/if}
</div>
