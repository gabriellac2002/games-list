import React from "react";
import './loaderSlice.css';

import ReactLoading from 'react-loading';

const LoaderSlice = () =>  {
    return (
        <div className="container_geral">
            <div className="container_loader">
                <ReactLoading type={'spin'} color='#2D6BEA' height={'20%'} width={'20%'} />
            </div>
        </div>
    );
  }
  
export default LoaderSlice;