import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise; 
    const db = client.db("bittree")
    const collection = db.collection("links")

     // If the handle is already claimed, you cannot create the bittree
     const item = await collection.findOne({handle: handle})
     if (!item) {
      return notFound()
     }

    const item2 = 
    {
      "_id": {
        "$oid": "6730b2d73aeaf6283b35d56b"
      },
      "links": [
        {
          "link": "https://www.youtube.com/@TechWithPrasum",
          "linktext": "youtube"
        },
        {
          "link": "https://github.com/",
          "linktext": "github"
        },
        {
          "link": "https://www.facebook.com/prasum.9028",
          "linktext": "facebook"
        }
      ],
      "handle": "prasum",
      "pic": "https://scontent.fbir4-1.fna.fbcdn.net/v/t39.30808-1/459139204_2744666895692654_3087656497089965469_n.jpg?stp=dst-jpg_s160x160&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=OqCN96LfDQQQ7kNvgEv2LfK&_nc_zt=24&_nc_ht=scontent.fbir4-1.fna&_nc_gid=AsblIMdvmkaPQm5EQTQCFCY&oh=00_AYDx_Uxlf_1oIz3yk4V7LhH_KziYWB1kK52wqkHoQuGBjg&oe=67368330"
    }
    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
      { item && <div className="photo flex justify-center flex-col items-center gap-3">
        <img src={item.pic} alt="" />
        <span className="font-bold text-xl">@{item.handle}</span>
        <span className="font-bold text-xl">@{item.desc}</span>
        <span className="desc w-80 text-center">Access to site with these app. Please follow one customer support links below.</span>
        <div className="links">
          {item.links.map((item, index)=>{
          return    <Link key={index} href={item.link}><div className="flex justify-center min-w-96 bg-purple-100 py-4 shadow-lg px-2 rounded-md my-3" >
          {item.linktext}
          </div>
          </Link>
        })}</div>
        </div>}
    </div>
  }