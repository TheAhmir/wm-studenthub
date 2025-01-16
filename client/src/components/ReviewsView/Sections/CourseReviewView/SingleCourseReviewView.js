import React from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SingleCourseReviewView.scss'

const SingleCourseReviewView = () => {
    const location = useLocation();
    const course = location.state?.course;

    if (!course) {
        return <div>No course information available</div>;
    }

    return (
        <div>
            <div className="heading">
                <h2>{course['title']}</h2>
                <p>{'>'} {course['prefix']} {course['code']}</p>
                <div className="course-rating">
                    {[...Array(5)].map(star => (
                        <FaStar  className="star"/>
                    ))}
                    <h3 className="text-rating">2.5</h3>
                </div>

                <h3 className="leave-a-review">Leave a Review!</h3>
            </div>

            <div className="body">
                <div className="review-count">
                    <p>4 reviews</p>
                </div>
                <div className="review">
                    <p>this is a comment</p>
                </div>
            </div>

        </div>
    );
};

export default SingleCourseReviewView;
