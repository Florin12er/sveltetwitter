<script lang="ts">
    import { page } from '$app/stores';
    import Tweet from '$lib/components/Tweet.svelte';
    import Icon from '@iconify/svelte';

    // Mock user data (replace with actual API call in a real app)
    const user = {
        username: '@' + $page.params.username,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Coffee enthusiast and web developer',
        followers: 100,
        following: 50,
        tweets: [
            { id: 1, content: 'Just had an amazing coffee! ☕️ #CoffeeLovers', likes: 15, retweets: 5, timestamp: '2h ago' },
            { id: 2, content: 'Working on a new project. Can\'t wait to share it! 🚀 #Coding', likes: 20, retweets: 8, timestamp: '1d ago' },
            { id: 3, content: 'The future of web development is exciting! 💻 #WebDev', likes: 30, retweets: 12, timestamp: '3d ago' },
        ]
    };
</script>

<div class="max-w-2xl mx-auto mt-8">
    <div class="bg-base-100 shadow-lg rounded-lg overflow-hidden">
        <div class="p-6">
            <div class="flex items-center space-x-4">
                <div class="avatar">
                    <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.avatar} alt={user.name} />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-primary">{user.name}</h1>
                    <p class="text-lg text-base-content/70">{user.username}</p>
                </div>
            </div>
            <p class="mt-4 text-base-content">{user.bio}</p>
            <div class="flex space-x-4 mt-4">
                <div class="flex items-center space-x-1">
                    <Icon icon="mdi:account-group" width="24" height="24" class="text-secondary" />
                    <span class="text-lg font-semibold">{user.followers} Followers</span>
                </div>
                <div class="flex items-center space-x-1">
                    <Icon icon="mdi:account-plus" width="24" height="24" class="text-accent" />
                    <span class="text-lg font-semibold">{user.following} Following</span>
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
        {#each user.tweets as tweet (tweet.id)}
            <Tweet {...tweet} username={user.username} />
        {/each}
    </div>
</div>
