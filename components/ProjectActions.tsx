import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectActions = ({projectId} : {projectId : string}) => {
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
        className={`flexCenter delete-action_btn bg-gray`}
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