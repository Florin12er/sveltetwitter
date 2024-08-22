<script lang="ts">
  export let username: string;
  export let name: string;
  export let avatar: string;
  export let bio: string;
</script>

<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
  <div class="card-body p-4">
    <div class="flex items-center">
      <img src={avatar} alt={name} class="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 class="card-title text-sm font-bold text-primary">{name}</h2>
        <p class="text-sm text-base-content">{username}</p>
      </div>
    </div>
    <p class="text-sm mt-2 text-base-content">{bio}</p>
    <div class="card-actions justify-end mt-2">
      <button class="btn btn-primary btn-sm">Follow</button>
    </div>
  </div>
</div>
