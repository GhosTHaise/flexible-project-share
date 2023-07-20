"use client"
import { SessionInterface } from "@/common.types"
import { create } from "domain";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type : String,
  session : SessionInterface
};

const ProjectForm = ({type,session} : Props) => {

  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setForm] = useState({
    image : "",
    title : "",
    description : "",
    liveSiteUrl : "",
    githubUrl : "",
    category : ""
  });


  const handleSubmit = (e : React.FormEvent) => {};
  const handleChangeImage = (e : ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if(!file) return;
    if(!file.type.includes('image')){
      return alert("Please upload an image file !");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        const result = reader.result as string;

        handleStateChange("image",result);
    }
  };
  
  const handleStateChange = (fieldname : string,value : string) => {
      setForm((prevState) => (
        {
          ...prevState,
          [fieldname] : value
        }
      ))
  }
   
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

        <CustomMenu 
            title="Category"
            state={form.category}
            filters={categoryFilters}
            setState={(value)=>handleStateChange("category",value)}
        />
        {/*Custom Icon Buttton*/}
        <div className="flexStart w-full">
            <Button
              title="create"
              type="submit"
              LeftIcon={isSubmitting ? "" : "/plus.svg"}
            />
        </div>
    </form>
  )
}

export default ProjectForm