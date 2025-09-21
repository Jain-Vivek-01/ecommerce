'use client'
import Image from "next/image"
import { useState } from "react"

export default function ItemCard({item}){

    const [imageNumber,setImageNumber]= useState(0);

return(

    <div>
        <div> 
            
            <h2>{item[0].title}</h2>

            {<Image src={`${item.props.images[imageNumber]}`} alt={`${item.category} image`}
            width={400} height={400} className="rounded-lg shadow-md"
            
            />}

             </div>
        
    </div>
)

}