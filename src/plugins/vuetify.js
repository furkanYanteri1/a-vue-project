import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VMain, VContainer, VChip, VSpacer, VCard } from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VMain,
    VContainer,
    VChip,
    VSpacer,
    VCard,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
