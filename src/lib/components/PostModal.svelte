<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';
    import RichTextEditor from './RichTextEditor.svelte';

    const dispatch = createEventDispatcher();

    let editorContent = '';
    let characterCount = 0;
    const MAX_CHARACTERS = 280;

    function handleEditorChange(event: CustomEvent) {
        editorContent = event.detail.content;
        characterCount = event.detail.characterCount;
    }

    function submitTweet() {
        if (editorContent.trim() && characterCount <= MAX_CHARACTERS) {
            dispatch('tweet', {
                content: editorContent
            });
            editorContent = '';
            closeModal();
        }
    }

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl">
        <div class="p-4 border-b border-base-300 flex justify-between items-center">
            <h2 class="text-xl font-bold text-base-content">Create a new post</h2>
            <button on:click={closeModal} class="btn btn-ghost btn-sm text-base-content">
                <Icon icon="mdi:close" width="24" height="24" />
            </button>
        </div>
        <div class="p-4">
            <RichTextEditor
                on:change={handleEditorChange}
                maxCharacters={MAX_CHARACTERS}
            />

            <div class="mt-2 flex justify-end space-x-2">
                <button class="btn btn-outline btn-neutral" on:click={closeModal}>Cancel</button>
                <button
                    class="btn btn-primary"
                    on:click={submitTweet}
                    disabled={characterCount === 0 || characterCount > MAX_CHARACTERS}
                >
                    Tweet
                </button>
            </div>
        </div>
    </div>
</div>
