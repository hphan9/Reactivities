import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css'
import { StoreContext, store} from './app/stores/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value ={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>,
)
