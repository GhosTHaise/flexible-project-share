"use client"
import { SessionInterface } from "@/common.types"
import { create } from "domain";
import { ChangeEvent } from "react";
import Image from "next/image";

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
    title : ""
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
            className="handleChangeImage"
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
    </form>
  )
}

export default ProjectForm