// src/App.js
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ReviewsView from './components/ReviewsView/ReviewsView';
import SingleCourseReviewView from './components/ReviewsView/Sections/CourseReviewView/SingleCourseReviewView';
import CourseInsights from './components/ReviewsView/Sections/CourseReviewView/CourseInsights';
import ShopView from './components/ShopView/ShopView';

const App = () => {
  return (
    <Router>
      <div className='container'>
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
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/*Shop Paths*/}
          <Route path='/shop' element={<ShopView />} />
          {/*Review Paths*/} 
          <Route path="/reviews" element={<ReviewsView />} />
          <Route path="/reviews/courses/:course" element={<SingleCourseReviewView/>} />
          <Route path="/reviews/course-insights" element={<CourseInsights />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
