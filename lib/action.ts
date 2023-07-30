import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsAllQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV == "production";
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : "letmein";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQlRequest = async (query : string,variables = {}) => {
    try {
        //client request
        return await client.request(query,variables);
    } catch (error) {
        throw error
    }
}

export const getUser = (email : string) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(getUserQuery,{
        email 
    })
}
export const createUser = (
    name : string,
    email : string,
    avatarUrl : string
) => {
    client.setHeader('x-api-key',apiKey);
    const variables = {
        input : {
            name,
            email,
            avatarUrl
        }
    }
    return makeGraphQlRequest(createUserMutation,variables);
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const uploadImage = async (imagePath : string) => {
    //console.log(imagePath);
    
    try {
        const response = await fetch(`${serverUrl}/api/upload`,{
            method : "POST",
            body : JSON.stringify({path : imagePath})
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const createNewProject = async (form : ProjectForm,creatorId : string,token : string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
        client.setHeader("Authorization" , `Bearer ${token}`);

        const variables =  {
            input : {
                ...form,
                image : imageUrl.url,
                createdBy : {
                    link : creatorId
                }
            }
        }
        console.log(variables);
        
        return await makeGraphQlRequest(
            createProjectMutation,
            variables
        )
    }
}

export const fetchAllProjects = async (category? : string ,endcursor? : string) => {
    client.setHeader('x-api-key',apiKey);
    let query : string  = (category && endcursor) ? projectsQuery : projectsAllQuery;
    return makeGraphQlRequest(query,{
        category,
        endcursor
    })
}

export const getProjectDetails = async (id : string) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(
        getProjectByIdQuery,
        {id}
        )
}

export const getUserProjects = async (id : string,last? : number) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQlRequest(
        getProjectsOfUserQuery,
        {
            id,
            last
        }
        );
}

export const deleteProject = async (id : string,token : string) => {

    client.setHeader("Authorization" , `Bearer ${token}`);
    //console.log(typeof id);
    
    return makeGraphQlRequest(
        deleteProjectMutation,
        {
            id,
        }
        );
}

export const updateProject = async (form : ProjectForm, projectid : string,token : string) => {

    function isBase64DataUrl(value : string) {
        const base34Regex = /^data:image\/[a-z]+;base64,/;
        return base34Regex.test(value);
    }

    let updatedForm = {...form};
    const isUploadingNewImage = isBase64DataUrl(updatedForm.image);
    
    if(isUploadingNewImage){
        const imageUrl = await uploadImage(form.image);
        if(imageUrl.url){
            updatedForm = {
                ...form,
                image : imageUrl
            }
        }
    }

    client.setHeader("Authorization" , `Bearer ${token}`);
    //console.log(typeof id);
    const variables = {
        id : projectid,
        input : updatedForm
    }
    return makeGraphQlRequest(
        updateProjectMutation,
        variables 
        );
}