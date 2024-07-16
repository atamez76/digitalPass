
import "../../globals.css";
import { ListRepositoryObjects } from "@/app/lib/actions";
import ContentStore from "@/app/components/content-store/content-store";

export default async function ContentPage() {

  /* const objects = await ListRepositoryObjects(); */


  
  return (
    <div className="main">
      <div className="page_header">
        <div className="titles">
          <h1>Content Gallery</h1>
          <h2>Manage your content Here </h2>
        </div>
      </div>
      <div className="page_body">
        <ContentStore /* objects={objects} *//>
      </div>
    </div>
  );
}
