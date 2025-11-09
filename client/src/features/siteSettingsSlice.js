import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  site_info: {},
  seo_pages: [],
  contact_info: {},
}

const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState,
  reducers: {
    // ✅ Save all site settings together
    setSiteSettings: (state, action) => {
      const { isLoading, settings } = action.payload

      const siteInfo = settings?.siteInfo || null
      const seoPages = settings?.seoPages || null
      const contactInfo = settings?.contactInfo || null

      // Step 1: Always update loading state first
      if (typeof isLoading === 'boolean') {
        state.isLoading = isLoading
      }

      // Step 2: Only update data when loading is finished
      if (!isLoading) {
        state.site_info = siteInfo || {}
        state.seo_pages = seoPages || []
        state.contact_info = contactInfo || {}
      }
    },

    // ✅ Update specific parts individually (optional use in dashboard)
    setSiteInfo: (state, action) => {
      state.site_info = { ...action.payload }
    },
    setSeoPages: (state, action) => {
      state.seo_pages = [...action.payload]
    },
    setContactInfo: (state, action) => {
      state.contact_info = { ...action.payload }
    },

    // ✅ Reset on logout or refresh
    resetSiteSettings: () => initialState,
  },
})

export const { setSiteSettings, setSiteInfo, setSeoPages, setContactInfo, resetSiteSettings } =
  siteSettingsSlice.actions

export default siteSettingsSlice.reducer
