import React from 'react'
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
type Props = {
    title : string;
    state : string;
    filters : Array<string>;
    setState : (value : string) => void;
}

const CustomMenu = ({
    title,
    state,
    filters,
    setState
} : Props) => {
  return (
    <div
        className='flexStart flex-col w-full gap-7 relative'
    >
        <label 
            htmlFor={title}
            className='w-full text-gray-100'
        >
            {title}
        </label>
        <Menu 
            as="div"
            className="self-start relative"
        >
            <div>
                <Menu.Button>
                    {state || "Select a category"}
                </Menu.Button>
            </div>
        </Menu>
    </div>
  )
}

export default CustomMenu