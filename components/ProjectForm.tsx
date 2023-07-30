"use client"
import { ProjectInterface, SessionInterface } from "@/common.types"
import { create } from "domain";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/action";
import { useRouter } from "next/navigation";
type Props = {
  type : String,
  session : SessionInterface,
  project? : ProjectInterface
};

const ProjectForm = ({type,session,project} : Props) => {
  const router = useRouter();

  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setForm] = useState({
    image : project?.image ||  "",
    title : project?.title ||  "",
    description : project?.description ||  "",
    liveSiteUrl : project?.liveSiteUrl ||  "",
    githubUrl : project?.githubUrl ||  "",
    category : project?.category ||  ""
  });


  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    setisSubmitting(true);

    const {token} = await fetchToken(); 

    try {
      if(type == "create"){
        //create project
        
          await createNewProject(form,session?.user?.id,token);

          router.push("/");
      }
      if(type == "edit"){
        //edit project 
        
        await updateProject(form,project?.id as  string,token);

        router.push("/");
      }
    } catch (error) {
          console.log(error);
    }finally{
      setisSubmitting(false);
    }
  };
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
              title={ isSubmitting ?  
                `${ type === 
                  "Create" ? "Creating" : "Editing"
                }` 
                  : 
                `${type === "create" ? "Create" : "Edit"}`}
              type="submit"
              leftIcon={isSubmitting ? "" : "/plus.svg"}
              isSubmitting={isSubmitting}
            />
        </div>
    </form>
  )
}

export default ProjectForm