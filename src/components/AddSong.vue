<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add song</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a new song</h4>
            <input type="text" required placeholder="Song title" v-model="title">
            <input type="text" required placeholder="Artist" v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { uuid } from 'vue-uuid'
import useDocument from '@/composables/useDocument'

export default {
    props: ['playlist'],
    setup(props) {
        const { updateDoc } = useDocument('playlists', props.playlist.id)

        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: uuid.v4()
            }

            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            title.value = ''
            artist.value = ''
        }

        return { title, artist, showForm, handleSubmit }
    }
}
</script>

<style scoped>
    form {
        max-width: 100%;
        text-align: left;
    }

    .add-song {
        text-align: center;
        margin-top: 40px;
    }
</style>