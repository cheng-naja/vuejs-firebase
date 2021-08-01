<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-else disabled>Loading...</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { login, isPending, error } = useLogin()
        const router = useRouter()
        
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)

            if (!error.value) {
                console.log('User logged in')
                router.push({ name: 'Home' })
            }
        }

        return { isPending, error, email, password, handleSubmit }
    }
}
</script>

<style>

</style>