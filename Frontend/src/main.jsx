import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';
import AllJobs from './components/Jobs/AllJobs.jsx';
import MyJobs from './components/Jobs/MyJobs.jsx';
import JobDetails from './components/Jobs/jobDetails.jsx';
import Application from './components/Application/Application.jsx';
import PostJob from "./components/Jobs/PostJob";
import NotFound from './components/utils/NotFound.jsx'
import MyApplications from './components/Application/MyApplications.jsx';
import Home from './components/Home/Home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App/> }>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={ <Login/> }/>
      <Route path='register' element={ <Register/> }/>
      <Route path='job/all' element={ <AllJobs/> }/>
      <Route path='job/:id' element={ <JobDetails/> }/>
      <Route path="job/post" element={<PostJob />} />
      <Route path="job/me" element={<MyJobs />} />
      <Route path="application/:id" element={<Application />} />
      <Route path='applications/me' element={ <MyApplications/> }/>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
