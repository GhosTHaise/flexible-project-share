import { getUserProjects } from "@/lib/action";

type Props = {
    params : {
        id : string
    }
}

const UserProfile = ({params : {id}} : Props) => {
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile