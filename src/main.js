import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHome,
    faUser,
    faEnvelope,
    faPhoneAlt,
    faClock 
} from '@fortawesome/free-solid-svg-icons' // Use free-solid-svg-icons for solid icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faUser, faEnvelope, faPhoneAlt, faClock)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)

app.mount('#app')
