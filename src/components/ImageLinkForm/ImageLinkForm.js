import React from 'react'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="form center">
                <div className="pa4 br3 shadow-5 center">
                    <input placeholder='enter an image link' className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
                    <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
