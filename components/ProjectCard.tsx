"use client"
import Link from 'next/link';
import React,{useState,useEffect} from 'react'
import Image from 'next/image';

type Props = {
    id : string;
    image : string;
    title : string;
    name : string;
    avatarUrl : string;
    userId : string;   
}
const ProjectCard = ({
    id,
    image,
    title,
    name,
    avatarUrl,
    userId
} : Props) => {
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(()=>{
        setRandomLikes(Math.floor(Math.random() * 10000));
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1)+"k"))
    },[]);
  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
        <Link 
            className='flexCenter group relative w-full h-full'
            href={`/project/${id}`}>
                <Image
                    src={image}
                    alt="Project Image"
                    width={414}
                    height={314}
                    className='w-full h-full object-cover rounded-2xl'
                />

                <div className='hidden group-hover:flex profile_card-title'>
                    <p className='w-full'>
                        {title}
                    </p>
                </div>
        </Link>
        <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
            <Link href={`/profile/${userId}`}>
                <div className='flexCenter gap-2'>
                    <Image
                        src={avatarUrl}
                        alt='Profile Image'
                        width={24}
                        height={24}
                        className='rounded-full'
                    />
                    <p>
                        {name}
                    </p>
                </div>
            </Link>

            <div className='flexCenter gap-3'>
                <div className='flexCenter gap-2'>
                    <Image
                        src="/hearth.svg"
                        height={13}
                        width={13}
                        alt='Heart'
                    />
                    <p className='text-sm'>
                        {randomLikes}
                    </p>
                </div>
                <div className='flexCenter gap-2'>
                    <Image
                        src="/eye.svg"
                        height={13}
                        width={13}
                        alt='eye'
                    />
                    <p className='text-sm'>
                        {randomViews}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard