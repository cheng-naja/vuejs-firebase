<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png">
            <h1><router-link :to="{ name: 'Home'}">- Playlist</router-link></h1>
            <div class="links">
                <div v-if="user">
                    <router-link class="btn" :to="{ name: 'UserPlaylist' }">My Playlist</router-link>
                    <router-link class="btn" :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
                    <span>Hello, {{ user.displayName }}</span>
                    <div class="error" v-if="error">{{ error }}</div>
                    <button @click="handleClick">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { logout, error } = useLogout()
        const { user } = getUser()
        const router = useRouter()

        const handleClick = async () => {
            await logout()

            if (!error.value) {
                console.log('user logged out')
                router.push({ name: 'Login' })
            }
        }

        return { handleClick, user, error }
    }

}
</script>

<style scoped>
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    nav h1 {
        margin-left: 20px;
    }

    nav .links {
        margin-left: auto;
    }

    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }
    
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }

    nav img {
        max-height: 60px;
    }

    span {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #eee;
    }
</style>