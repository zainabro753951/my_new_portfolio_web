import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CursorHoverProvider } from './context/CursorHover.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js' // ✅ Import your Redux store
import AuthLoader from './context/AuthLoader.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './queryClient.js'
import DeleteEntry from './context/DeleteEntry.jsx'
import { HelmetProvider } from 'react-helmet-async'

const isDev = import.meta.env.VITE_REACT_ENV === 'development'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DeleteEntry>
          <CursorHoverProvider>
            <AuthLoader>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </AuthLoader>
          </CursorHoverProvider>
        </DeleteEntry>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
)
