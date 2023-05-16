import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const { status, data, statusText } = useRouteError()
    // console.log(status, data, statusText)
    return (
        <div className='flex items-center h-screen'>
            <div className='flex justify-center text-center items-center border border-warning rounded-[50%] lg:h-[500px] w-[300px] h-[300px] lg:w-[500px] mx-auto mt-'>
                <div>
                    <h1 className='text-warning font-medium text-9xl'>{status || "Error"}</h1>
                    <h3 className='text-warning font-medium text-5xl'>{statusText}</h3>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;