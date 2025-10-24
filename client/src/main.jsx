import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CursorHoverProvider } from './context/CursorHover.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js' // ✅ Import your Redux store
import AuthLoader from './context/AuthLoader.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './queryClient.js'

const isDev = import.meta.env.VITE_REACT_ENV === 'development'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CursorHoverProvider>
          <AuthLoader>
            <App />
          </AuthLoader>
        </CursorHoverProvider>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
)
