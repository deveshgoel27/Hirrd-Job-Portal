import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'

import JobListing from './pages/JobListing'
import OnBoarding from './pages/OnBoarding'
import LandingPage from './pages/LandingPage'
import JobPage from './pages/JobPage'
import MyJobs from './pages/MyJobs'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'

import AppLayout from './layout/AppLayout'
import { ThemeProvider } from './components/ThemeProvider'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <OnBoarding />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          ), 
        },
        {
          path: "/job/:id",
          element: (
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          ), 
        },
        {
          path: "/my-jobs",
          element: (
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          ), 
        },
        {
          path: "/post-job",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ), 
        },
        {
          path: "/saved-jobs",
          element: (
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          ), 
        },
      ],
    },
  ])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
