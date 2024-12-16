// src/App.js
import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ReviewsView from './components/ReviewsView/ReviewsView';
import SingleCourseReviewView from './components/ReviewsView/Sections/CourseReviewView/SingleCourseReviewView';
import CourseInsights from './components/ReviewsView/Sections/CourseReviewView/CourseInsights';
import ShopView from './components/ShopView/ShopView';
import EmailAuthView from './components/AuthenticationViews/EmailAuthView';
import { IoPersonCircleSharp } from "react-icons/io5";
import { auth } from './components/FirebaseAuth/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileView from './components/ProfileView/ProfileView';
import ForgotPasswordView from './components/AuthenticationViews/ForgotPasswordView';
import SignupAndSignin from './components/AuthenticationViews/SignupAndSignin';

// Nav component
const Nav = () => {
  const [user, setUser] = useState(null)
  // initialize location and specify when to show nav
  const location = useLocation()
  const showNavDisplay = !location.pathname.startsWith('/auth')

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("User is logged in");
          setUser(user); // Set the signed-in user
      } else {
          console.log("User is not logged in");
          setUser(null); // Clear user if not signed in
      }
  });

  // Clean up subscription on unmount
  return () => unsubscribe();
  }, []);

  // nav component with navigation links
  return (
    <>
    {showNavDisplay ? (
      <div className='nav'>
          <Link to={'/'} className='home-link'>
            <h3>StudentHub</h3>
          </Link>
          <div className='links'>
            {/*<Link to={'/'}>Home</Link>*/}
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/reviews'}>Reviews</Link>
            <Link to={'/about'}>About</Link>
          </div>
          {user ? 
            <Link to={'/my-profile'}>
              <div className='profile-icon'>
                <IoPersonCircleSharp />
              </div>
            </Link>
            :
            <Link to={'/auth/signin'}>
              <div className='profile-text'>
                Sign In
              </div>
            </Link>
          }
        </div>
    ) :
    (
      <div className='nav'>
          <Link to={'/'} className='home-link'>
            <h3>StudentHub</h3>
          </Link>
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
          <Route path='/auth/email-auth' element={<EmailAuthView />} />
          <Route path='/auth/signin' element={<SignupAndSignin />} />
          <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />

          {/*User Profile Paths*/}
          <Route path='/my-profile' element={<ProfileView />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
