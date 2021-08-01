<template>
    <div v-for="item in playlists" :key="item.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: item.id }}">
            <div class="single">
                <div class="thumbnail">
                    <img :src="item.coverUrl">
                </div>
                <div class="info">
                    <h3>{{ item.title }}</h3>
                    <p>Created by {{ item.userName }}</p>
                </div>
                <div class="song-number">
                    <p>{{ item.songs.length }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['playlists']
}
</script>

<style scoped>
    img {
        width: 150%;
        height: 150%;
        display: block;
    }

    .info {
        margin: 0 30px;
    }

    .single {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        margin: 16px 0;
        transition: all ease 0.2s;
    }

    .single:hover {
        box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
        transform: scale(1.02);
        transition: all ease 0.2s;
    }

    .song-number {
        margin-left: auto;
    }

    .thumbnail {
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }
</style>