import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import { Diary, Home, SchoolNotes } from '@/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='diary' element={<Diary />} />
      <Route path='notes' element={<SchoolNotes />} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
