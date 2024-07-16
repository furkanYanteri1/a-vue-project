import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHome,
    faUser,
    faEnvelope,
    faPhoneAlt,
    faClock,
    faPlusCircle,
    faCalendarAlt,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faUser, faEnvelope, faPhoneAlt, faClock, faPlusCircle, faCalendarAlt, faPlus)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(vuetify)

app.mount('#app')
