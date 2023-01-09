import React from 'react'
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Page = ({blogs=[]}) => {
  const router = useRouter();
  
  const handleClick = (id) =>{
    console.log("visiting page", id)
    router.push(`/${id}`);
  
  }
  return (
    <>
      <Head>
        <title>Blog Page</title>
        <meta title="description" content="blogs, react,js, typescripts"></meta>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        {
          blogs.map((blog)=>(
            <div key={blog.id}>
              <h1 onClick={()=>handleClick(blog.id)}> {blog.title} </h1>
            </div>
          ))
        }
      </main>
    </>
  )
}

export async function getServerSideProps(){
  let res = await fetch("http://localhost:8080/blogs");
  let data = await res.json();
  return {
    props:{
      blogs:data,
    },
  }
}

export default Page