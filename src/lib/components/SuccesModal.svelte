<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';

    export let message: string;
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        <div class="flex justify-end">
    <button on:click={closeModal} class="btn btn-ghost">
            <Icon icon="mdi:close" width="24" height="24" />
            </button>
        </div>

        <div class="p-6 text-center">

            <h3 class="text-lg font-bold text-base-content mb-4">{message}</h3>
            <div class="mb-4 text-green-500 flex justify-center">
                <Icon icon="mdi:check-circle" width="64" height="64" />
            </div>

            
        </div>
    </div>
</div>
