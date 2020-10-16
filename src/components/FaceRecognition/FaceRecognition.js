import React, { useEffect } from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({image_url, boxes}) => {
    useEffect(()=>{
        
    },[boxes])
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                {
                    image_url !== '' ?
                    <img className='ma center' src={image_url} alt="detect-img" width='500px' height='auto' id='input_img'/>
                    :
                    <div></div>
                }
                {boxes.map(box => {
                    return (
                    <div style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}className='bounding-box'></div>
                    )
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;
