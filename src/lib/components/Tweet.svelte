<script lang="ts">
  import Icon from '@iconify/svelte';

  export let username: string;
  export let content: string;
  export let likes: number;
  export let retweets: number;
</script>

<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 border border-base-300">
  <div class="card-body p-4">
    <div class="flex items-center space-x-2">
      <div class="avatar">
        <div class="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={`https://i.pravatar.cc/40?u=${username}`} alt={username} />
        </div>
      </div>
      <div>
        <h2 class="font-bold text-primary">{username}</h2>
        <p class="text-xs text-base-content/70">@{username.slice(1)}</p>
      </div>
    </div>
    <p class="mt-3 text-base-content">{content}</p>
    <div class="card-actions justify-start mt-4 space-x-4">
      <button class="btn btn-ghost btn-sm text-base-content hover:text-error">
        <Icon icon="mdi:heart-outline" class="mr-1" width="20" height="20" />
        <span class="text-sm">{likes}</span>
      </button>
      <button class="btn btn-ghost btn-sm text-base-content hover:text-success">
        <Icon icon="mdi:repeat" class="mr-1" width="20" height="20" />
        <span class="text-sm">{retweets}</span>
      </button>
      <button class="btn btn-ghost btn-sm text-base-content hover:text-info">
        <Icon icon="mdi:comment-outline" class="mr-1" width="20" height="20" />
      </button>
      <button class="btn btn-ghost btn-sm text-base-content hover:text-warning">
        <Icon icon="mdi:share-variant-outline" width="20" height="20" />
      </button>
    </div>
  </div>
</div>
