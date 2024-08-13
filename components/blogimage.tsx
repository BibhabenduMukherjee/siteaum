export function BlogImage({imageurl} : {imageurl:string}){

    return (
        <>
         <div className="flex justify-center items-center h-screen">
      <div className="w-full lg:w-4xl p-4">
        <img
          src= {imageurl}
          alt="Sample"
          className="w-full h-auto object-cover rounded-md shadow-lg"
        />
      </div>
    </div></>
    )
}