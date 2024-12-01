import React from "react";
import './ShopView.scss'

const ShopView = () => {

    const recent_filler = Array(7).fill(null)
    

    return (
        <div>
            <h3>Hi!</h3>
            <p>This is the shop view!!!!</p>
            <div className="recent">
                {recent_filler.map((_, index) => (
                    <div className="recent-element" key={index}>
                        <img src="/textbook.jpg" alt="recent-image"/>
                        <p>Science for Lower Secondary</p>
                        <p>Price: ${10.00 + index}</p>
                    </div>
                ))} 
            </div>

            <div>
                <input type="text" />
            </div>
            
            <div className="main-search">
            {recent_filler.map((_, index) => (
                    <div>
                        <div className="main-element" key={index}>
                            <img src="/textbook.jpg" alt="search-image"/>
                            <div className="main-element-meta">
                                <p>Science for Lower Secondary</p>
                                <p>Price: ${10.00}</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))} 
            </div>
        </div>
    )
}
export default ShopView;