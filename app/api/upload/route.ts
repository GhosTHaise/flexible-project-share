import { NextResponse } from "next/server";
import { v2 as cloudinary} from "cloudinary";

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});

export async function POST(request : Request){
    const {path }= await request.json();
    //console.log(await request.json());

    if(!path){
        NextResponse.json({
            message : "Image path is required"
        },{
            status : 400
        })
    }

    try {
        const options = {
            use_filename : true,
            unique_filename : true,
            overwrite : true,
            transformation : [{
                width : 1000,
                height : 752,
                crop : "scale"
            }]
        };
        console.log("Avant upload");
        const result = await cloudinary.uploader.upload(path,options);
        console.log("Apres upload");
        
        return NextResponse.json(
            result,
            {status : 200}
        )
    } catch (error) {
        console.log("POST Upload=>",error);
        
        return NextResponse.json(
            {message : error},
            {status : 500}
        )
    }
}