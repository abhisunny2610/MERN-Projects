import React from 'react'
import { Link } from 'react-router-dom'

const CardShimmer = () => {
    return (
        <div className="card m-3" aria-hidden="true" style={{width:"350px", height:"fit-content"}}>
            <div className="card-image placeholder-wave">
                <span className='placeholder bg-secondary'style={{height:'200px', width:"350px"}}></span>
            </div>
                <div className="card-body">
                    <h5 className="card-title placeholder-wave">
                        <span className="placeholder col-12 bg-secondary"></span>
                    </h5>
                    <p className="card-text placeholder-wave">
                        <span className="placeholder col-6 bg-secondary"></span>
                        <span className="placeholder col-12 bg-secondary"></span>
                        <span className="placeholder col-12 bg-secondary"></span>
                        <span className="placeholder col-12 bg-secondary"></span>
                        <span className="placeholder col-8 bg-secondary"></span>
                    </p>
                    <Link to="" className="btn  btn-sm btn-secondary disabled placeholder col-3" aria-disabled="true"></Link>
                </div>
                
        </div>
    )
}


const Shimmer = () => {
    return (
        <div className='d-flex flex-wrap m-4'>
            {
                new Array(6).fill(0).map((element, index)=> {
                    return <CardShimmer key={index} />
                })
            }
        </div>
    )
}

export default Shimmer