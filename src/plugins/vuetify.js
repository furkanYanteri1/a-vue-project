import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VMain, VContainer, VChip, VSpacer, VCard, VDatePicker, VDialog, VCardActions, VCardTitle, VCardText, VBtn } from 'vuetify/components'
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
    VCardActions,
    VCardTitle,
    VCardText,
    VDatePicker,
    VDialog,
    VBtn,
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
