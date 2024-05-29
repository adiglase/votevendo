import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CreateElectionView from '@/views/CreateElectionView.vue'
import VoteView from '@/views/VoteView.vue'
import { getAccounts, isMetamaskInstalled } from '@/utils'
import ToastEventBus from 'primevue/toasteventbus'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                pageName: 'Home',
                noAuth: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            meta: {
                pageName: 'Dashboard'
            }
        },
        {
            path: '/create-election',
            name: 'create-election',
            component: CreateElectionView,
            meta: {
                pageName: 'Create New Vendor Election'
            }
        },
        {
            path: '/vote',
            name: 'vote',
            component: VoteView,
            meta: {
                pageName: 'Cast Your Vote'
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (!to.meta.noAuth) {
        if (!isMetamaskInstalled()) {
            next({ name: 'home' })
            ToastEventBus.emit('add', {
                severity: 'error',
                summary: 'Error',
                detail: 'Metamask is not instaleld',
                life: 3000
            })

            return
        }

        const accounts = await getAccounts()
        if (accounts.length === 0) {
            next({ name: 'home' })
            ToastEventBus.emit('add', {
                severity: 'error',
                summary: 'Error',
                detail: 'Connect your metamask wallet first!',
                life: 3000
            })

            return
        }
    }

    next()
})

export default router
