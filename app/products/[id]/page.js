import FinalProductPage from "@/components/FinalProductPage"

export default async function FinalProduct({params}){

    const {id}= await params

   
 return(
 <div>
    
    <FinalProductPage id={id}/>
    </div>
 )

}