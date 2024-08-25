<script lang="ts">
  import Tweet from '$lib/components/Tweet.svelte';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  import { writable } from 'svelte/store';

  // Mock data for the main tweet
  const mainTweet = {
    id: 1,
    username: '@johndoe',
    content: 'Just had an amazing coffee! ☕️ #CoffeeLovers',
    likes: 15,
    retweets: 5,
    timestamp: '2h ago'
  };

  // Mock data for responses
  let responses = writable([
    { id: 101, username: '@coffeeaddict', content: 'Sounds great! What blend was it?', likes: 3, retweets: 0, timestamp: '1h ago' },
    { id: 102, username: '@baristapro', content: 'Nothing beats a good cup of coffee to start the day!', likes: 5, retweets: 1, timestamp: '45m ago' },
    { id: 103, username: '@tealovers', content: 'Tea is better! 😉', likes: 2, retweets: 0, timestamp: '30m ago' },
    { id: 104, username: '@coffeeshopowner', content: 'Glad you enjoyed it! Come visit our shop for more amazing blends.', likes: 4, retweets: 1, timestamp: '15m ago' },
  ]);

  let showResponseEditor = false;
  let responseContent = '';
  let characterCount = 0;
  const MAX_CHARACTERS = 280;

  function toggleResponseEditor() {
    showResponseEditor = !showResponseEditor;
  }

  function handleEditorChange(event: CustomEvent) {
    responseContent = event.detail.content;
    characterCount = event.detail.characterCount;
  }

  function submitResponse() {
    if (responseContent.trim() && characterCount <= MAX_CHARACTERS) {
      const newResponse = {
        id: Date.now(), // Use a proper ID generation in a real app
        username: '@currentuser', // Replace with actual logged-in user
        content: responseContent,
        likes: 0,
        retweets: 0,
        timestamp: 'Just now'
      };
      responses.update(r => [newResponse, ...r]);
      responseContent = '';
      showResponseEditor = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto mt-8">
  <div class="mb-8">
    <Tweet {...mainTweet} detailed={true} />
  </div>

  <div class="mb-4">
    <button on:click={toggleResponseEditor} class="btn btn-primary">
      {showResponseEditor ? 'Cancel Response' : 'Add Response'}
    </button>
  </div>

  {#if showResponseEditor}
    <div class="mb-4 bg-base-200 p-4 rounded-lg">
      <RichTextEditor
        on:change={handleEditorChange}
        maxCharacters={MAX_CHARACTERS}
        height={200}
      />
      <div class="mt-2 flex justify-end">
        <button
          class="btn btn-primary"
          on:click={submitResponse}
          disabled={characterCount === 0 || characterCount > MAX_CHARACTERS}
        >
          Submit Response
        </button>
      </div>
    </div>
  {/if}

  <h2 class="text-2xl font-bold mb-4 text-primary">Responses</h2>

  <div class="space-y-4">
    {#each $responses as response (response.id)}
      <Tweet {...response} />
    {/each}
  </div>
</div>
