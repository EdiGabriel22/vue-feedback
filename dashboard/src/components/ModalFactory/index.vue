<template>
    <teleport to="body">
        <div
            v-if="state.isActive"
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
            @click="handleModalToogle({ status: false})"
        >
            <div
                class="fixed mx-10"
                :class="state.width"
            >
                <div class="flex flex-col overflow-hidden bg-white rounded-lg animate__fadeInDown animate__faster animate__animated">
                    <div class="flex flex-col px-12 py-10 bg-white">
                        <component :is="state.component" />
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))

const DEFAULT_WHIDTH = 'w-3/4 lg:w-1/3'

export default {
    components: {
        ModalLogin
    },

    setup() {
        const modal = useModal()
        const state = reactive({
            isActive: false,
            component: {},
            props: {},
            width: DEFAULT_WHIDTH
        })

        onMounted(() => {
            modal.listen(handleModalToogle)
        })

        onBeforeUnmount(() => {
            modal.off(handleModalToogle)
        })

        function handleModalToogle(payload) {
            if (payload.status) {
                state.component = payload.component
                state.props = payload.props
                state.width = payload.width ?? DEFAULT_WHIDTH
            } else {
                state.component = {}
                state.props = {}
                state.width = DEFAULT_WHIDTH
            }

            state.isActive = payload.status
        }

        return {
            state,
            handleModalToogle
        }
    }
}
</script>
