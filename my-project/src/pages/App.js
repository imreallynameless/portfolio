import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Layout from "../Components/Layout";
import PlaygroundLayout from "../Components/PlaygroundLayout";

// Lazy load all non-critical components
const About = lazy(() => import("./About"));
const Projects = lazy(() => import("./Projects"));
const NoPage = lazy(() => import("./404"));
const ResumeComponent = lazy(() => import("./Resume"));
const Food = lazy(() => import("./Playground/Food"));
const Playground = lazy(() => import("./Playground"));
const Music = lazy(() => import("./Playground/Music"));
const Tft = lazy(() => import("./Playground/Tft"));
const Bookbar = lazy(() => import("./Playground/Bookbar"));
const Patchnotes = lazy(() => import('./Patchnotes'));
const Patch = lazy(() => import('./Patch'));

// Loading component for better UX
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/resume",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ResumeComponent />
      </Suspense>
    ),
  },
  {
    element: <Layout />,
    children: [
      { 
        path: "/about", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: "/projects", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        ) 
      },
      { 
        path: "/patchnotes", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Patchnotes />
          </Suspense>
        ) 
      },
      { 
        path: "/patchnotes/:patchVersion", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Patch />
          </Suspense>
        ) 
      },
    ]
  },
  {
    element: <PlaygroundLayout />,
    children: [
      { 
        path: "/playground", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Playground />
          </Suspense>
        ) 
      },
      { 
        path: "/playground/food", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Food />
          </Suspense>
        ) 
      },
      { 
        path: "/playground/music", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Music />
          </Suspense>
        ) 
      },
      { 
        path: "/playground/Tft", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Tft />
          </Suspense>
        ) 
      },
      { 
        path: "/playground/bookbar", 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Bookbar />
          </Suspense>
        ) 
      },
    ]
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NoPage />
      </Suspense>
    ),
  },
]);

function App() {
  // Prefetch critical routes after initial load
  React.useEffect(() => {
    const prefetchRoutes = () => {
      // Prefetch the most likely next pages
      import("./About");
      import("./Projects");
    };
    
    // Small delay to let the initial page load first
    const timeoutId = setTimeout(prefetchRoutes, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
