import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify' // Import Vuetify

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHome,
    faUser,
    faEnvelope,
    faPhoneAlt,
    faClock,
    faPlusCircle,
    faCalendarAlt,
    faPlus // Import faPlus for the plus icon
} from '@fortawesome/free-solid-svg-icons' // Use free-solid-svg-icons for solid icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faUser, faEnvelope, faPhoneAlt, faClock, faPlusCircle, faCalendarAlt, faPlus) // Ensure plus icon is added

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(vuetify) // Use Vuetify

app.mount('#app')
