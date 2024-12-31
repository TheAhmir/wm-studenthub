// src/App.js
import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ReviewsView from './components/ReviewsView/ReviewsView';
import SingleCourseReviewView from './components/ReviewsView/Sections/CourseReviewView/SingleCourseReviewView';
import CourseInsights from './components/ReviewsView/Sections/CourseReviewView/CourseInsights';
import ShopView from './components/ShopView/ShopView';
import { IoPersonCircleSharp } from "react-icons/io5";
import { auth } from './components/FirebaseAuth/firebase';
import { trackUserChanges } from './components/FirebaseAuth/AuthMethods';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileView from './components/ProfileView/ProfileView';
import ForgotPasswordView from './components/AuthenticationViews/ForgotPasswordView';
import SignupAndSignin from './components/AuthenticationViews/SignupAndSignin';
import { verifyEmail } from './components/FirebaseAuth/AuthMethods';
import SignInView from './components/AuthenticationViews/SignIn';

// Nav component
const Nav = () => {
  const [user, setUser] = useState(null)
  const [sentVerificationEmail, setSentVerificationEmail] = useState(false);
  const [selected, setSelected] = useState('');
  // initialize location and specify when to show nav
  const location = useLocation()
  const showNavDisplay = !location.pathname.startsWith('/auth')

  const handleSendVerificationEmail = () => {
    verifyEmail(auth.currentUser, (result) => {
      setSentVerificationEmail(result)
    })
  }

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = trackUserChanges(setUser);

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSelected(location.pathname)
  }, [location])

  // nav component with navigation links
  return (
    <div className='nav-container'>
    {showNavDisplay ? (
      <div>
        {user && (
          !user.emailVerified && (
            <div className={`email-not-verified-notice ${sentVerificationEmail ? 'verification-sent' : ''}`}>
              {sentVerificationEmail ? 
                (
                  <p className='verification-text'>Verification email has been sent. Please check you email to verify.</p>
                )
                :
                (
                  <p className='verification-text'>You have not verified your email. Send verification link <b className='verify-email-button' onClick={handleSendVerificationEmail}>here</b></p>
              )}
            </div>
          )
        )}
        <div className={`nav ${user && !user.emailVerified ? 'email-not-verified-content' : ''}`}>
          <Link to={'/'} className='home-link'>
            <h3>StudentHub</h3>
          </Link>
          <div className='links'>
            {/*<Link to={'/'}>Home</Link>*/}
            <Link className={selected === '/shop' ? 'selected' : ''} to={'/shop'}>Shop</Link>
            <Link className={selected === '/reviews' ? 'selected' : ''} to={'/reviews'}>Reviews</Link>
            <Link className={selected === '/about' ? 'selected' : ''}  to={'/about'}>About</Link>
          </div>
          {user ? 
            <Link className={`profile-link`} to={'/my-profile'}>
              <div className={`profile-icon ${selected === '/my-profile' ? 'selected' : ''}`}>
                <IoPersonCircleSharp />
              </div>
            </Link>
            :
            <Link className='profile-link' to={'/auth/signin'}>
              <div className='profile-text'>
                Sign In
              </div>
            </Link>
          }
        </div>
      </div>
    ) :
    (
      <div className='nav'>
          <Link to={'/'} className='home-link'>
            <h3>StudentHub</h3>
          </Link>
        </div>
    )}
    </div>
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
          <Route path='/auth/signin' element={<SignupAndSignin />} />
          <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
          <Route path='/auth/forgot-password/__/auth/action' element={<ForgotPasswordView />} />
          <Route path='/auth/new-password-signin' element={<SignInView />} />

          {/*User Profile Paths*/}
          <Route path='/my-profile' element={<ProfileView />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
