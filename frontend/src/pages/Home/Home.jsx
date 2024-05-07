import React from 'react'
 
const Home = ({ modalType }) => {
  const isLoginModalOpen = modalType === 'login';
  const isRegisterModalOpen = modalType === 'register';

  return (
        <div className='flex items-center justify-center h-96'>
           <div className='container mx-auto text-center text-6xl font-bold'>Press Login</div>
            {isLoginModalOpen && <Login />}
            {isRegisterModalOpen && <Register />}
        </div>
        
   )
 }
 
export default Home