
import { useEffect } from 'react';
import FriendsCard from '../components/friends/FriendsCard';
import './FriendsPage.scss';
import axios from 'axios'


const FriendsPage=()=>{

  useEffect(async()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/users');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

    return (
       <div className="friends-right-content">
         <div className="friends-middle-content">
         <div className="top">
          <FriendsCard/>
        </div>
       
      </div>
      

             
 </div>
    )
};

export default FriendsPage;

