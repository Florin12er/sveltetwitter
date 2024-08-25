<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import Editor from '@tinymce/tinymce-svelte';

    export let initialContent = '';
    export let maxCharacters = 280;
    export let height = 300;

    const dispatch = createEventDispatcher();
    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

    let editorContent = initialContent;
    let showEditor = false;
    let characterCount = 0;

    $: characterCount = editorContent.replace(/<[^>]*>/g, '').length;

    onMount(() => {
        setTimeout(() => {
            showEditor = true;
        }, 100);
    });

    function handleEditorChange(event: CustomEvent) {
        editorContent = event.detail.content;
        dispatch('change', { content: editorContent, characterCount });
    }

    let conf = {
        height,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount emoticons'
        ],
        toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | emoticons',
        content_style:
            'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
        skin: document.documentElement.getAttribute('data-theme') === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
        emoticons_database: 'emojis',
        emoticons_append: {
            custom_mind_explode: {
                keywords: ['brain', 'mind', 'explode', 'blown'],
                char: '🤯'
            }
        }
    };
</script>

{#if showEditor}
    <Editor
        apiKey={apiKey}
        on:change={handleEditorChange}
        {conf}
        initialValue={initialContent}
    />
{/if}

<div class="mt-2 flex justify-between items-center">
    <span class={characterCount > maxCharacters ? 'text-error' : 'text-base-content'}>
        {characterCount} / {maxCharacters} characters
    </span>
</div>

<style>
    :global(.tox-tinymce) {
        border-radius: 0.5rem;
        overflow: hidden;
    }
    
    :global(.mce-content-body img.emoji) {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: -0.1em;
        margin: 0 .05em 0 .1em;
    }
</style>
