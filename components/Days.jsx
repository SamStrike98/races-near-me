import React from 'react'

const Days = ({ days }) => {
    const str = days.toString()
    const arr = str.split('');

    return (
        <div className='flex flex-row'>
            {arr.map((item, index) => (
                <span key={index} className={`w-[30px] text-center ${index === 0 ? 'border-2' : 'border-r-2 border-t-2 border-b-2'} border-black p-2 bg-white text-black font-extrabold shadow-md`}>{item}</span>
            ))}
        </div>
    )
}

export default Days