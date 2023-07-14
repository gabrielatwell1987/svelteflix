<script>
    import {media} from '$lib/api';
    import {onMount, createEventDispatcher} from 'svelte';

    export let movies;
    export let next;

    const dispatch = createEventDispatcher();

    let viewport;
    let results;
    let item_width;
    let item_height;
    let num_columns = 4;
    let a = 0;
    let b = movies.length;
    let padding_top = 0;
    let padding_bottom = 0;

    function handle_resize() {
        const first = results.firstChild;

        item_width = first.offsetWidth;
        item_height = first.offsetHeight;
        num_columns = 4;

        handle_scroll();
    }

    function handle_scroll() {
        const remaining = viewport.scrollHeight - (viewport.scrollTop + viewport.clientHeight);
        console.log(remaining);

        if (remaining < 400) {
            dispatch('end');
        }

        a = Math.floor(viewport.scrollTop / item_height) * num_columns;
        b = Math.ceil((viewport.scrollTop + viewport.clientHeight) / item_height) * num_columns;

        padding_top = Math.floor(a / num_columns) * item_height;
        padding_bottom = Math.floor((movies.length - b) / num_columns) * item_height;
    }

    onMount(handle_resize);
</script>

<svelte:window on:resize={handle_resize} />

<!-- <p>showing {a} - {b}</p> -->

<div bind:this={viewport} class="viewport" on:scroll={handle_scroll}>
    <div bind:this={results} class="results" style:padding-top="{padding_top}px" style:padding-bottom="{padding_bottom}px">
        {#each movies.slice(a, b) as movie}
            <a href="/movies/{movie.id}">
                <img src={media(movie.poster_path, 500)} alt={movie.title}>
            </a>
        {/each}
    </div>
    {#if next}
        <a href={next}>Next Page</a>
    {/if}
</div>

<style>
    .viewport {
        overflow-y: auto;
    }
    .results {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }
    a {
        width: 100%;
        aspect-ratio: 2/3;
    }
    img {
        width: 100%;
    }
</style>