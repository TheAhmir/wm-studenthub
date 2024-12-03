// src/App.js
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ReviewsView from './components/ReviewsView/ReviewsView';
import SingleCourseReviewView from './components/ReviewsView/Sections/CourseReviewView/SingleCourseReviewView';
import CourseInsights from './components/ReviewsView/Sections/CourseReviewView/CourseInsights';
import ShopView from './components/ShopView/ShopView';
import SigninView from './components/AuthenticationViews/SigninView';
import SignupView from './components/AuthenticationViews/SignupView';

// Nav component
const Nav = () => {
  // initialize location and specify when to show nav
  const location = useLocation()
  const pathsToHideNav = ['/signin', '/signup', '/forgot-password']
  const showNavDisplay = !pathsToHideNav.includes(location.pathname)

  // nav component with navigation links
  return (
    <>
    {showNavDisplay && (
      <div className='nav'>
          <h3>StudentHub</h3>
          <div className='links'>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/reviews'}>Reviews</Link>
            <Link to={'/about'}>About</Link>
          </div>
          <Link to={'/signin'}>Sign In</Link>
        </div>
    )}
    </>
  )
}

// Main app component
// specifies all possible pages
const App = () => {
  return (
    <Router>
      <div className='container'>
        <Nav />
        <Routes>
          {/*Root*/}
          <Route path="/" element={<HomeView />} />

          {/*Shop Paths*/}
          <Route path='/shop' element={<ShopView />} />

          {/*Review Paths*/} 
          <Route path="/reviews" element={<ReviewsView />} />
          <Route path="/reviews/courses/:course" element={<SingleCourseReviewView/>} />
          <Route path="/reviews/course-insights" element={<CourseInsights />} />

          {/*Authentication Paths*/}
          <Route path='/signin' element={<SigninView />} />
          <Route path='/signup' element={<SignupView />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
