<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	let editorContent = '';
	let showEditor = false;
	let characterCount = 0;
	const MAX_CHARACTERS = 280; // Twitter-like character limit
    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

	onMount(() => {
		setTimeout(
			() => {
				showEditor = true;
			},

			100
		);
	});

	function handleEditorChange(event: CustomEvent) {
		editorContent = event.detail.content;
		// Strip HTML tags for character count
		characterCount = editorContent.replace(/<[^>]*>/g, '').length;
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

     let conf = {
    height: 300,
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

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
	<div class="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl">
		<div class="p-4 border-b border-base-300 flex justify-between items-center">
			<h2 class="text-xl font-bold text-base-content">Create a new post</h2>
			<button on:click={closeModal} class="btn btn-ghost btn-sm text-base-content"
				><Icon icon="mdi:close" width="24" height="24" /></button
			>
		</div>
		<div class="p-4">
			{#if showEditor}
				<Editor
					apiKey={apiKey}
					on:change={handleEditorChange}
					{conf}
				/>
			{/if}

			<div class="mt-2 flex justify-between items-center">
				<span class={characterCount > MAX_CHARACTERS ? 'text-error' : 'text-base-content'}>
					{characterCount}

					/ {MAX_CHARACTERS}

					characters
				</span>
				<div class="space-x-2">
					<button class="btn btn-outline btn-neutral" on:click={closeModal}>Cancel</button><button
						class="btn btn-primary"
						on:click={submitTweet}
						>Tweet
					</button>
				</div>
			</div>
		</div>
	</div>
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
