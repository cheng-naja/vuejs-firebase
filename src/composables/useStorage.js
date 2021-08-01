import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from './getUser'
import { uuid } from 'vue-uuid'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        console.log(uuid.v4)
        filePath.value = `covers/${ user.value.uid }/${ uuid.v4() }` // this is template string (not single quote, the top left one)
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)

            if (!res) {
                throw new Error('Upload file failed, something went wrong')
            }

            url.value = await res.ref.getDownloadURL()
        } catch(err) {
            console.log(err.messsage)
            error.value = err.messsage
        }
    }

    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete()
        } catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { url, filePath, uploadImage, deleteImage, error }
}

export default useStorage