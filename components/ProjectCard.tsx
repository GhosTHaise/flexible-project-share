import React from 'react'

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
  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>

    </div>
  )
}

export default ProjectCard