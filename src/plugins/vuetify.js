import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VApp, VAppBar, VMain, VContainer, VChip, VSpacer, VCard, VDatePicker, VDialog, VCardActions, VCardTitle, VCardText, VBtn,VRow, VCol, VTextField, VSelect, VAutocomplete, VDivider } from 'vuetify/components'
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
    VRow,
    VCol,
    VTextField,
    VSelect,
    VAutocomplete,
    VDivider,
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
