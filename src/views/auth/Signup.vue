<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" required placeholder="Display name" v-model="displayName">
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-else disabled>Signing up...</button>
    </form>  
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { signup, isPending, error } = useSignup()
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)

            if (!error.value) {
                console.log('User signed up')
                router.push({ name: 'UserPlaylist' })
            }
        }

        return { isPending, error, email, password, displayName, handleSubmit }
    }
}
</script>

<style>

</style>