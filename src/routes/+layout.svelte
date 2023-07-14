<script>
    import '../app.css';
    import {page} from '$app/stores';
</script>


<nav>
    <a href="/">
        <img src="svelteflix.svg" alt="Svelteflix">
    </a>

    <div class="links">
        <a href="/search">Search</a>
        <a href="/watchlist">Watchlist</a>
        <a href="/login">Login</a>
    </div>
</nav>

<br><br><br><br>

<main class:infinite={$page.data.infinite}>
    <slot></slot>
</main>

<br><br><br><br>

<footer>
    <a href="https://themoviedb.org/">
        <img class="tmdb" src="tmdb.svg" alt="The Movie Database">
    </a>
</footer>

<style>
    nav {
        display: flex;
        width: 100%;
        height: 3rem;
        align-items: center;
        justify-content: space-between;
        max-width: var(--column);
        padding: 0 var(--side);
        color: var(--accent);
        margin-top: 1.5rem;
    }
    a {
        color: inherit;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 700;
        padding-right: 5rem;
    }
    a:hover {
        color: antiquewhite;
    }
    img {
        width: 200px;
        margin-left: 5rem;
    }
    .links {
        display: flex;
        gap: 4rem;
        padding-left: 57rem;
    }
    .tmdb {
        width: 150px;
        height: 75px;
    }
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    main.infinite {
        height: 0;
        flex: 1;
        overflow: hidden;
    }
</style>