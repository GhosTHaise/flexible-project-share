import { ProjectInterface } from '@/common.types';
import { getProjectDetail } from '@/lib/action';
import { getCurrentUser } from '@/lib/session'
import React from 'react'

const Project = async ({params : {id}} : { params : { id : string}}) => {
    const session = await getCurrentUser();
    const result = await getProjectDetail(id) as {
        project? : ProjectInterface 
    };

    if(!result?.project){
        return <p>Failed to fetch project information.</p>
    }
    console.log(result);
    
  return (
    <div>page</div>
  )
}

export default Project