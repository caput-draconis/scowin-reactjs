import page from '../../images/page1.png';
import React, { Fragment } from 'react';
import '../../common/Styles/style.css';

export default function vaccination() {
  return (
    <Fragment>
      <div className="sec1">
        <div> 
            <img className="img1" src={page} alt='page_construction' />
        </div>
      </div>
    </Fragment>
  )
}
