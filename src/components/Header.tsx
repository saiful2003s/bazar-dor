import Image from 'next/image';
import React from 'react';

const HeaderPage = () => {
    return (
        <div className='container mx-auto p-5'>
            <div>
                <div>
                    <Image className='bg-green-600 rounded-md p-2' src="/logo-icon.png" alt="logo" width={32} height={32} priority/>
                </div>
                <div></div> 
            </div>
        </div>
    );
};

export default HeaderPage;