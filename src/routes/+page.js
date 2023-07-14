import * as api from '$lib/api';

export async function load({fetch}) {
    const [trending, now_playing, upcoming] = await Promise.all([
        api.get(fetch, 'trending/movie/day', {page: 1}),
        api.get(fetch, 'movie/now_playing', {page: 1}),
        api.get(fetch, 'movie/upcoming', {page: 1})
    ]);
    
    const featured = await api.get(fetch, `movie/${trending.results[0].id}`, {
        append_to_response: 'images,videos,recommendations'
    });

    return {
        trending,
        now_playing,
        upcoming,
        featured
    }
}