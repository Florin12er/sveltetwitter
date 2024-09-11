<script lang="ts">
    import Icon from '@iconify/svelte';
    export let username: string;
    export let fullName: string;
    export let avatar: string;
    export let bio: string;
    export let followers: number = 0;
    export let following: number = 0;
</script>

<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 border border-base-300">
    <div class="card-body p-4">
        <div class="flex items-center space-x-4">
            <div class="avatar">
                <div class="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={avatar} alt={fullName} />
                </div>
            </div>
            <div>
                <h2 class="text-lg font-bold text-primary">{fullName}</h2>
                <p class="text-sm text-base-content/70">@{username}</p>
            </div>
        </div>
        <p class="mt-3 text-base-content">{bio}</p>
        <div class="flex space-x-4 mt-2">
            <div class="flex items-center space-x-1">
                <Icon icon="mdi:account-group" width="20" height="20" class="text-secondary" />
                <span class="text-sm font-semibold">{followers} Followers</span>
            </div>
            <div class="flex items-center space-x-1">
                <Icon icon="mdi:account-plus" width="20" height="20" class="text-accent" />
                <span class="text-sm font-semibold">{following} Following</span>
            </div>
        </div>
        <div class="card-actions justify-end items-center mt-4">
            <a href={`/user/${username}`} class="btn btn-outline btn-primary btn-sm">
                <Icon icon="mdi:account" class="mr-1" width="18" height="18" />View Profile
            </a>
            <button class="btn btn-primary btn-sm">
                <Icon icon="mdi:account-plus" class="mr-1" width="18" height="18" />Follow
            </button>
        </div>
    </div>
</div>
