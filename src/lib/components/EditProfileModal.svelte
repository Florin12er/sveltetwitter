<!-- EditProfileModal.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let user: any;

    const dispatch = createEventDispatcher();

    let editedUser = { ...user };

    function closeModal() {
        dispatch('close');
    }

    function saveProfile() {
        dispatch('save', editedUser);
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl p-6">
        <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
        <form on:submit|preventDefault={saveProfile} class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium">Name</label>
                <input type="text" id="name" bind:value={editedUser.name} class="input input-bordered w-full" />
            </div>
            <div>
                <label for="username" class="block text-sm font-medium">Username</label>
                <input type="text" id="username" bind:value={editedUser.username} class="input input-bordered w-full" />
            </div>
            <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" bind:value={editedUser.email} class="input input-bordered w-full" />
            </div>
            <div>
                <label for="bio" class="block text-sm font-medium">Bio</label>
                <textarea id="bio" bind:value={editedUser.bio} class="textarea textarea-bordered w-full" rows="3"></textarea>
            </div>
            <div>
                <label for="website" class="block text-sm font-medium">Website</label>
                <input type="url" id="website" bind:value={editedUser.website} class="input input-bordered w-full" />
            </div>
            <div>
                <label for="address" class="block text-sm font-medium">Address</label>
                <input type="text" id="address" bind:value={editedUser.address} class="input input-bordered w-full" />
            </div>
            <div class="flex justify-end space-x-2">
                <button type="button" on:click={closeModal} class="btn btn-ghost">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </div>
</div>
