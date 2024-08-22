<script lang="ts">
  export let username: string;
  export let content: string;
  export let likes: number;
  export let retweets: number;
</script>

<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
  <div class="card-body p-4">
    <h2 class="card-title text-sm font-bold text-primary">{username}</h2>
    <p class="text-sm mt-2 text-base-content">{content}</p>
    <div class="card-actions justify-start mt-4">
      <button class="btn btn-ghost btn-xs text-base-content">
        <i class="fas fa-heart text-error mr-1"></i>
        {likes}
      </button>
      <button class="btn btn-ghost btn-xs text-base-content">
        <i class="fas fa-retweet text-success mr-1"></i>
        {retweets}
      </button>
    </div>
  </div>
</div>
