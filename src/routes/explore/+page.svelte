<script lang="ts">
  import { onMount } from 'svelte';
  import Tweet from '$lib/components/Tweet.svelte';
  import User from '$lib/components/User.svelte';

  let searchTerm = '';
  let searchResults: (typeof mockTweets[number] | typeof mockUsers[number])[] = [];

  // Mock data
  const mockTweets = [
    { id: 't1', username: '@johndoe', content: 'Just had an amazing coffee! ☕️ #CoffeeLovers', likes: 15, retweets: 5 },
    { id: 't2', username: '@janedoe', content: 'Working on a new project. Can\'t wait to share it! 🚀 #Coding', likes: 20, retweets: 8 },
    { id: 't3', username: '@techguru', content: 'The future of AI is here, and it\'s mind-blowing! 🤖 #ArtificialIntelligence', likes: 50, retweets: 25 },
  ];

  const mockUsers = [
    { id: 'u1', username: '@johndoe', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', bio: 'Coffee enthusiast and web developer' },
    { id: 'u2', username: '@janedoe', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=5', bio: 'Full-stack developer and cat lover' },
    { id: 'u3', username: '@techguru', name: 'Tech Guru', avatar: 'https://i.pravatar.cc/150?img=8', bio: 'AI researcher and futurist' },
  ];

  function search() {
    const term = searchTerm.toLowerCase();
    searchResults = [
      ...mockTweets.filter(tweet => tweet.content.toLowerCase().includes(term) || tweet.username.toLowerCase().includes(term)),
      ...mockUsers.filter(user => user.name.toLowerCase().includes(term) || user.username.toLowerCase().includes(term) || user.bio.toLowerCase().includes(term))
    ];
  }

  onMount(() => {
    // Initialize with all results
    searchResults = [...mockTweets, ...mockUsers];
  });

  function isTweet(result: typeof mockTweets[number] | typeof mockUsers[number]): result is typeof mockTweets[number] {
    return 'content' in result;
  }
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

  <h2 class="text-2xl font-bold mb-4 text-primary">Tweets:</h2>
  <div class="space-y-4">
    {#each searchResults.filter(isTweet) as tweet (tweet.id)}
      <Tweet {...tweet} />
    {/each}
  </div>

  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Users:</h2>
  <div class="space-y-4">
    {#each searchResults.filter(result => !isTweet(result)) as user (user.id)}
      <User {...user} />
    {/each}
  </div>
</div>
