import React, {useEffect, useState} from "react";
import { trackUserChanges } from "../../../../FirebaseAuth/AuthMethods";
import { useLocation } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import AddComment from "./AddComment";
import './SingleCourseReviewView.scss'

const SingleCourseReviewView = () => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [makeReview, setMakeReview] = useState(false);
    const [avgDifficulty, setAvgDifficulty] = useState(null);
    const [avgWorkLoad, setAvgWorkLoad] = useState(null);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const location = useLocation();

    // course element passed from parent
    const course = location.state?.course;

    const toggleMakeReview = () => {
        setMakeReview(prevState => !prevState)
    }

    const calculateAverages = () => {
        if (!reviewsLoaded) return;

        const totalDifficulty = reviews.reduce((sum, review) => sum + Number(review.difficulty), 0)
        setAvgDifficulty((totalDifficulty / reviews.length).toFixed(1))

        const totalWorkLoad = reviews.reduce((sum, review) => sum + Number(review.workLoad), 0)
        setAvgWorkLoad((totalWorkLoad / reviews.length).toFixed(1))

    }

    useEffect(() => {
        calculateAverages()
    }, [reviews, calculateAverages])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/reviews/${course._id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
            .then(reviewData => {
                setReviews(reviewData)
                setReviewsLoaded(true)

                })
                .catch(err => {
                    console.error("Error fetching reviews:", err)
                });


        // Listen for authentication state changes
        const unsubscribe = trackUserChanges(setUser);
    
        // Clean up subscription on unmount
        return () => unsubscribe();
      }, [course._id]);

    if (!course) {
        return <div>No course information available</div>;
    }

    return (
        <>
        {makeReview && (
            <AddComment close={toggleMakeReview} this_user={user} course={course}/>
        )}
        <div>
            <div className="heading">
                <h2>{course['title']}</h2>
                <p>{'>'} {course['prefix']} {course['code']}</p>
                <div className="course-rating">
                    <div className={`text-rating ${isNaN(avgDifficulty) || !avgDifficulty ? 'missing' : avgDifficulty < 2.5 ? 'low' : avgDifficulty < 4 ? 'med' : 'high'}`}>
                        <h3>{isNaN(avgDifficulty) || !avgDifficulty ? '' : avgDifficulty}</h3>
                        <p className="rating-title">Difficulty</p>
                    </div>
                    <div className={`text-rating ${isNaN(avgWorkLoad) || !avgWorkLoad ? 'missing' : avgWorkLoad < 2.5 ? 'low' : avgWorkLoad < 4 ? 'med' : 'high'}`}>
                        <h3>{isNaN(avgWorkLoad) || !avgWorkLoad ? '' : avgWorkLoad}</h3>
                        <p className="rating-title">Work Load</p>
                    </div>
                </div>

                <h3 className="leave-a-review" onClick={toggleMakeReview}>Leave a Review!</h3>
            </div>

            <div className="body">
                <div className="review-count">
                    <p>{reviews ? reviews.length : '0'} reviews</p>
                </div>
                <div className="reviews">
                    {reviews && (reviews.map((review, index) => (
                        <div className="review">
                            <div className="meta-data">
                                <p>{review.userName}</p>
                                <div className="date-trash">
                                    <p>{review.date_added}</p>
                                    {review.userId === user.uid && <FaRegTrashAlt  className="trash-icon"/>}
                                </div>
                            </div>

                            <div className="review-rating">
                                <label>Difficulty: {review.difficulty}</label>
                                <label>Work Load: {review.workLoad}</label>
                            </div>
                            <p>{review.body}</p>
                        </div>
                    )))}
                </div>
            </div>

        </div>
        </>
    );
};

export default SingleCourseReviewView;
