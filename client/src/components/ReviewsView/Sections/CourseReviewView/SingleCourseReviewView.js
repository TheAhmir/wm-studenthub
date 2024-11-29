import React from "react";
import { useLocation } from "react-router-dom";
import './SingleCourseReviewView.scss'

const SingleCourseReviewView = () => {
    const location = useLocation()
    const course = location.state?.course
    return (
        <div>
            <div className="heading">
                <h2>{course['title']}</h2>
                <p>{'>'} {course['prefix']} {course['code']}</p>
            </div>
        </div>
    )
}

export default SingleCourseReviewView