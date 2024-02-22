import React from 'react'
import './CenterBody.scss'
import CenterContent from '../components/profile/CenterContent'
import RightContent from '../components/profile/RightContent'



const CenterBody = () => {
  return (
    <div className='center-body'>
        <div className="center-left-prof">
        <CenterContent />
        </div>
        <div className="center-right-prof">
        <RightContent />
        </div>


    </div>
  )
}

export default CenterBody