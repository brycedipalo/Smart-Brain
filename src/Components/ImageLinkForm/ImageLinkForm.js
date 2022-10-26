import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
            {'This will detect faces in your pictures.'}
            </p>         
            <div className='center'>
                <div className='form center pa4 br3 shadow-5' >
                    <input className='ff4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                     className='bg-gray w-30 grow f4 link ph3 pv2 dib white'
                     onClick={onButtonSubmit}>Detect</button>
                </div>      
            </div>
        </div>

    );
}

export default ImageLinkForm;
