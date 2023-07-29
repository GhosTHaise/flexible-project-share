"use client"
import React,{useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProject, fetchToken } from '@/lib/action';
import { useRouter } from 'next/navigation';

const ProjectActions = ({projectId} : {projectId : string}) => {
  const [isDeletting, setIsDeletting] = useState(false);
  const router = useRouter()

  const handleDeleteProject = async () => {
    setIsDeletting(true);
    
    const {token} = await fetchToken();
    
    try {
      await deleteProject(projectId,token);  
      router.push("/")
    } catch (error) {
        console.log(error);
    }finally{
        setIsDeletting(false);
    }
  }

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className='flexCenter edit-action_btn'
      >
        <Image 
            src="/pencile.svg" 
            width={15}
            height={15}
            alt='edit'
          />
      </Link>
      <button
        type='button'
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${isDeletting ? "bg-gray" : "bg-primary-purple"}`}
      >
        <Image 
            src="/trash.svg" 
            width={15}
            height={15}
            alt='edit'
          />
      </button>
    </>
  )
}

export default ProjectActions