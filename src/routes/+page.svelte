<script lang="ts">
  import Tweet from '$lib/components/Tweet.svelte';

  // Mock tweets data
  const tweets = [
    { id: 1, username: '@johndoe', content: 'Just had an amazing coffee! ☕️ #CoffeeLovers', likes: 15, retweets: 5, timestamp: '2h ago' },
    { id: 2, username: '@janedoe', content: 'Working on a new project. Can\'t wait to share it! 🚀 #Coding', likes: 20, retweets: 8, timestamp: '3h ago' },
    { id: 3, username: '@techguru', content: 'The future of AI is here, and it\'s mind-blowing! 🤖 #ArtificialIntelligence', likes: 50, retweets: 25, timestamp: '5h ago' },
    { id: 4, username: '@travelbug', content: 'Just booked my next adventure! Greece, here I come! 🇬🇷 #TravelLife', likes: 30, retweets: 12, timestamp: '7h ago' },
    { id: 5, username: '@foodielove', content: 'Made the most delicious pasta tonight. Recipe coming soon! 🍝 #FoodieLife', likes: 40, retweets: 18, timestamp: '9h ago' },
  ];
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-3xl font-bold mb-6 text-primary">Home</h1>
  
  <div class="space-y-4">
    {#each tweets as tweet (tweet.id)}
      <Tweet {...tweet} />
    {/each}
  </div>
</div>
