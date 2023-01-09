import React from 'react';
import { useRouter } from "next/router";

const Page = ({blogs}) => {
  const router = useRouter();
  //console.log(router);
  return (
    <div>
      <h1>
        Page:{router.query.id}
      </h1>
      <h1>{blogs.title}</h1>
      <h1>{blogs.description}</h1>
      <h3 onClick={()=>router.back()}>Go Back</h3>
    </div>
  )
}

export async function getStaticPaths(){
  let res = await fetch("http://localhost:8080/blogs");
  let data = await res.json();
  return {
    paths:data.map((blog)=>({params:{id:blog.id.toString()}})),
    fallback:false,
  };
}

export async function getStaticProps(context) {
  console.log("context", context);
  /* const {
    query:{id},
  } = context */
  const {
    params:{id},
  } = context;
  let res = await fetch(`http://localhost:8080/blogs/${id}`);
  let data = await res.json();
  return {
    props:{
      blogs:data,
    },
  }
}

export default Page