import { SessionInterface } from "@/common.types"

type Props = {
  type : String,
  session : SessionInterface
};

const ProjectForm = ({type,session} : Props) => {
  const handleSubmit = (e : React.FormEvent) => {};
  return (
    <form
      onSubmit={handleSubmit}
      className="flexStart form"
    >

    </form>
  )
}

export default ProjectForm