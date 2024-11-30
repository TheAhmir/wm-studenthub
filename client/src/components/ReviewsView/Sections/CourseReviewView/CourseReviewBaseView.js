import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import './CourseReviewBaseView.scss';
import { Link } from 'react-router-dom';

const CourseReviewBaseView = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [prefixText, setPrefixText] = useState('')
    const [codeText, setCodeText] = useState('')
    const [titleText, setTitleText] = useState('')

    useEffect(() => {
        fetch(require('../../../../pythonVis/data/course_id_data.xlsx'))
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const workbook = XLSX.read(buffer, {type : "array"});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        }).catch(err => console.error("Error loading XLSX file:", err))
    }, []);

    useEffect(() => {
        const data_filter = data.filter(row =>
        (prefixText ? row['prefix'].toLowerCase().includes(prefixText.toLowerCase()) : true ) &&
        (codeText ? row['code'].includes(codeText) : true) &&
        (titleText ? row['title'].toLowerCase().includes(titleText.toLowerCase()) : true)
        );
        setFilteredData(data_filter)
    }, [prefixText, codeText, titleText, data])
    
    return (
        <div>
            <div className="search">
                <div>
                    <p>Prefix:</p>
                    <input
                    type="text"
                    value={prefixText}
                    onChange={(e) => setPrefixText(e.target.value)}></input>
                </div>
                <div>
                    <p>Code:</p>
                    <input
                    type="text"
                    value={codeText}
                    onChange={(e) => setCodeText(e.target.value)}></input>
                </div>
                <div>
                    <p>Title</p>
                    <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}></input>
                </div>
                <div>
                    <a href="/reviews/course-insights">
                        <h2>
                            {"Fun Insights!"}
                        </h2>
                    </a>
                </div>
            </div>
            <h1>Filtered Courses</h1>
            {filteredData.map((row, index) => (
                <div>
                    <Link 
                    to={`/reviews/courses/${row['prefix']}-${row['code']}-${row['title'].replace(/\s+/g, '-').replace('?', '')}`}
                    state={{ course : row}}
                    key={index}>
                    {row['prefix']} {row['code']} - {row['title']}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default CourseReviewBaseView