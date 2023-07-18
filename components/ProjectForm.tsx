"use client"
import { SessionInterface } from "@/common.types"
import { create } from "domain";
import { ChangeEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";

type Props = {
  type : String,
  session : SessionInterface
};

const ProjectForm = ({type,session} : Props) => {

  const handleSubmit = (e : React.FormEvent) => {};
  const handleChangeImage = (e : ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldname : String,value : String) => {
    
  }
  const form = {
    image : "",
    title : "",
    description : "",
    liveSiteUrl : "",
    githubUrl : ""
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flexStart form"
    >
        <div className="flexStart form_image-container">
          <label 
            htmlFor="image"
            className="flexCenter form_image-label"
          >
            {!form.image && "Choose a poster for your project"}
          </label>
          <input 
            type="file" 
            id="image"
            accept="image/*"
            required={type === 'create'}
            className="form_image-input"
            onChange={handleChangeImage}
          />
          {
            form.image &&
            <Image
                src={form.image}
                className="sm:p-10 object-contain z-20"
                alt="Project poster"
                fill
            />
          }
        </div>
        <FormField
          title="Title"
          state={form.title}
          setState={(value) => handleStateChange("title",value)}
          placeholder="Flexible"
        />
        <FormField
          title="Description"
          state={form.description}
          setState={(value) => handleStateChange("description",value)}
          placeholder="Showcase and discover remarkable devdeloper projects."
        />
        <FormField
        type="url"
          title="Website Url"
          state={form.liveSiteUrl}
          setState={(value) => handleStateChange("liveSiteUrl",value)}
          placeholder="fitiavanasambatraportfolio.netlify.app"
        />
        <FormField
          type="url"
          title="Github Url"
          state={form.githubUrl}
          setState={(value) => handleStateChange("githubUrl",value)}
          placeholder="https://github.com/GhosTHaise"
        />
        <FormField
          title="Title"
          state={form.title}
          setState={(value) => handleStateChange("title",value)}
          placeholder="Flexible"
        />
    </form>
  )
}

export default ProjectForm