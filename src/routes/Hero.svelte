<script>
    import {media} from '$lib/api';

    export let movie;

    $: images = movie.images;
    $: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
    $: logo = images.logos.find((image) => image.iso_639_1 === 'en') || images.backdrops[0];
</script>

<a href="/movies/{movie.id}" class="column">
    <img class="backdrop" src={media(backdrop.file_path, 1280)} alt={movie.title} style="aspect-ratio: {backdrop.aspect_ratio}">
    <img class="logo" src={media(logo.file_path, 1280)} alt={movie.title} style="aspect-ratio: {logo.aspect_ratio}">
</a>

<style>
    a {
        display: flex;
    }
    .backdrop {
        width: 100%;
    }
    .logo {
        position: absolute;
        top: 0;
        left: 1rem;
        width: 30%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 1rem black);
    }
</style>