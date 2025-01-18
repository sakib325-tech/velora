import React from 'react'

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className='flex items-center justify-center h-full bg-[#121212]'>
        {children}
        </div>
    
    );
    
}
    
export default AuthLayout