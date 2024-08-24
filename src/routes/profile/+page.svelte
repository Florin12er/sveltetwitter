<script lang="ts">
    import Tweet from '$lib/components/Tweet.svelte';
    import EditProfileModal from '$lib/components/EditProfileModal.svelte';
    import Icon from '@iconify/svelte';
    import { writable } from 'svelte/store';

    const user = writable({
        name: 'Jane Doe',
        username: '@janedoe',
        email: 'jane.doe@example.com',
        address: '123 Tech Street, Silicon Valley, CA 94000',
        profilePicture: 'https://i.pravatar.cc/200?img=5',
        bannerPicture: 'https://picsum.photos/1000/300',
        bio: 'Full-stack developer | Coffee enthusiast | Cat lover',
        followers: 1234,
        following: 567,
        tweets: 789,
        website: 'https://janedoe.dev'
    });

    const tweets = [
        {
            id: 1,
            username: $user.username,
            content: 'Just deployed a new feature! 🚀 #CodingLife',
            likes: 42,
            retweets: 12
        },
        {
            id: 2,
            username: $user.username,
            content: 'Coffee break! ☕️ Time to recharge.',
            likes: 23,
            retweets: 5
        },
        {
            id: 3,
            username: $user.username,
            content: 'Excited for the tech conference next week! Who else is going? #TechConf2023',
            likes: 56,
            retweets: 18
        }
    ];

    let showEditModal = false;

    function openEditModal() {
        showEditModal = true;
    }

    function handleCloseModal() {
        showEditModal = false;
    }

    function handleSaveProfile(event: CustomEvent) {
        user.set(event.detail);
        showEditModal = false;
    }
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl text-base-content">
    <div class="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <figure class="h-64">
            <img src={$user.bannerPicture} alt="Profile Banner" class="w-full object-cover" />
        </figure>
        <div class="card-body relative">
            <div class="absolute -top-16 left-6">
                <div class="avatar">
                    <div class="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img src={$user.profilePicture} alt={$user.name} />
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button on:click={openEditModal} class="btn btn-primary btn-outline">
                    <Icon icon="mdi:pencil" class="mr-2" />Edit Profile
                </button>
            </div>
            <h2 class="card-title text-3xl mt-8 text-primary">{$user.name}</h2>
            <p class="text-lg text-base-content/70">{$user.username}</p>
            <p class="mt-2">{$user.bio}</p>
            <div class="stats shadow mt-4">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <Icon icon="mdi:twitter" width="24" height="24" />
                    </div>
                    <div class="stat-title">Tweets</div>
                    <div class="stat-value text-primary">{$user.tweets}</div>
                </div>
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <Icon icon="mdi:account-group" width="24" height="24" />
                    </div>
                    <div class="stat-title">Followers</div>
                    <div class="stat-value text-secondary">{$user.followers}</div>
                </div>
                <div class="stat">
                    <div class="stat-figure text-accent">
                        <Icon icon="mdi:account-plus" width="24" height="24" />
                    </div>
                    <div class="stat-title">Following</div>
                    <div class="stat-value text-accent">{$user.following}</div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="flex items-center space-x-2">
                    <div class="badge badge-primary badge-outline">
                        <Icon icon="mdi:email" width="16" height="16" />
                    </div>
                    <a href={`mailto:${$user.email}`} class="link link-primary">{$user.email}</a>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="badge badge-secondary badge-outline">
                        <Icon icon="mdi:map-marker" width="16" height="16" />
                    </div>
                    <span class="text-sm">{$user.address}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="badge badge-accent badge-outline">
                        <Icon icon="mdi:web" width="16" height="16" />
                    </div>
                    <a href={$user.website} target="_blank" rel="noopener noreferrer" class="link link-accent">
                        {$user.website}
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="divider text-2xl my-8">Recent Tweets</div>

    <div class="space-y-4">
        {#each tweets as tweet (tweet.id)}
            <Tweet {...tweet} />
        {/each}
    </div>
</div>

{#if showEditModal}
    <EditProfileModal 
        user={$user} 
        on:close={handleCloseModal} 
        on:save={handleSaveProfile} 
    />
{/if}
