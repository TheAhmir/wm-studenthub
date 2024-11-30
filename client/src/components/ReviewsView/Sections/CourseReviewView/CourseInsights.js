import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import * as XLSX from 'xlsx';

const CourseInsights = () => {
    const [data, setData] = useState([]);
    const [chart1Data, setChart1Data] = useState(null);
    const [treeMapData, setTreeMapData] = useState(null);

    const plotlyColors = [
        '#1f77b4', // Blue
        '#ff7f0e', // Orange
        '#2ca02c', // Green
        '#d62728', // Red
        '#9467bd', // Purple
        '#8c564b', // Brown
        '#e377c2', // Pink
        '#7f7f7f', // Gray
        '#bcbd22', // Yellow
        '#17becf'  // Cyan
    ];

    // Function to get color based on index, wrapping around if necessary
    const generateColor = (index) => {
        return plotlyColors[index % plotlyColors.length];
    };

    useEffect(() => {
        fetch(require('../../../../pythonVis/data/course_id_data.xlsx'))
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setData(jsonData);
            })
            .catch(err => console.error("Error loading XLSX file:", err));
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            // Count the number of courses per prefix
            const prefixCounts = {};
            data.forEach(item => {
                prefixCounts[item.prefix] = (prefixCounts[item.prefix] || 0) + 1;
            });

            // Create data for the bar chart
            const sortedPrefixCounts = Object.entries(prefixCounts)
                .map(([prefix, count]) => ({ prefix, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 15);

            setChart1Data({
                x: sortedPrefixCounts.map(item => item.prefix),
                y: sortedPrefixCounts.map(item => item.count),
            });

            // Filter to get the top 30 prefixes and format data for the tree map
            const top30Prefixes = Object.entries(prefixCounts)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([prefix]) => prefix);

            const top30Data = data.filter(course => top30Prefixes.includes(course.prefix));
            setTreeMapData(formatDataForTreeMap(top30Data));
        }
    }, [data]);

    const formatDataForTreeMap = (data) => {
        const labels = [];
        const parents = [];
        const values = [];
    
        // Group data by prefix and aggregate the counts
        const groupedData = data.reduce((acc, course) => {
            if (!acc[course.prefix]) {
                acc[course.prefix] = { label: course.prefix, count: 0 };
            }
            acc[course.prefix].count += 1; // Increment count for each course in the prefix
            return acc;
        }, {});
    
        // Convert grouped data into arrays for labels, parents, and values
        for (const [group] of Object.entries(groupedData)) {
            labels.push(group.label);
            parents.push(''); // Top-level nodes have no parent
            values.push(group.count);
        }
    
        return { labels, parents, values };
    };
    

    return (
        <div>
            <div className="heading">
                <h2>Course Insights</h2>
            </div>
            {chart1Data ? (
                <Plot
                    data={[
                        {
                            x: chart1Data.x,
                            y: chart1Data.y,
                            type: 'bar',
                            marker: { color: chart1Data.x.map((_, index) => generateColor(index)) },
                            name: 'Course Count'
                        }
                    ]}
                    layout={{
                        title: 'Top 10 Amount of Courses Offered',
                        xaxis: { title: 'Prefix' },
                        yaxis: { title: 'Count' },
                        autosize: true,
                    }}
                />
            ) : (
                <p>Loading bar chart...</p>
            )}
            {treeMapData ? (
                <Plot
                    data={[
                        {
                            type: 'treemap',
                            labels: treeMapData.labels,
                            parents: treeMapData.parents,
                            values: treeMapData.values,
                            textinfo: 'label+value',
                            marker: {
                                colorscale: 'Viridis',
                                showscale: true
                            }
                        }
                    ]}
                    layout={{
                        title: 'Courses Tree Map',
                        margin: { t: 30, l: 0, r: 0, b: 0 },
                        height: 600,
                        width: 1000,
                    }}
                />
            ) : (
                <p>Loading tree map...</p>
            )}
        </div>
    );
};

export default CourseInsights;
