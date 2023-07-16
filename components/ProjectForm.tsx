"use client"
import { SessionInterface } from "@/common.types"
import { create } from "domain";
import { ChangeEvent } from "react";

type Props = {
  type : String,
  session : SessionInterface
};

const ProjectForm = ({type,session} : Props) => {

  const handleSubmit = (e : React.FormEvent) => {};
  const handleChangeImage = (e : ChangeEvent<HTMLInputElement>) => {};

  const image = null;
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
            {!image && "Choose a poster for your project"}
          </label>
          <input 
            type="file" 
            id="image"
            accept="image/*"
            required={type === 'create'}
            className="handleChangeImage"
            onChange={handleChangeImage}
          />
        </div>
    </form>
  )
}

export default ProjectForm