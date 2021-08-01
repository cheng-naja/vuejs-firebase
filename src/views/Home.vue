<template>
  <div class="home">
    <div class="error">{{ error }}</div>
    <div v-if="playlists">
      <ListView :playlists="playlists"/>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
  name: 'Home',
  setup() {
    const { documents: playlists, error } = getCollection('playlists')

    return { playlists, error }
  },
  components: {
    ListView
  }
}
</script>
