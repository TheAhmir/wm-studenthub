import React, { useEffect, useState } from "react";
import CourseReviewBaseView from "./Sections/CourseReviewView/CourseReviewBaseView";
import './ReviewsView.scss';

const ReviewsView = () => {
    const [optionSelect, setOptionSelect] = useState('courses')

    const renderSection = () => {
        switch (optionSelect) {
            case 'housing':
                break;
            case 'courses':
                return <CourseReviewBaseView/>
            default:
                break;
        }
    }
    
    return (
        <div>
            <div className="review-links">
                <h3 className="section-changer" onClick={() => setOptionSelect('housing')}>Housing</h3>
                <h3 className="section-changer" onClick={() => setOptionSelect('courses')}>Courses</h3>
            </div>
            {renderSection()}

        </div>
    )
}

export default ReviewsView