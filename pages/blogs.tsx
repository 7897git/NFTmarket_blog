import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import sanityClient from "./client.js";
import theme from '../assets/css/Base.module.scss';


export default function Blog() {

  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
            title,
            slug,
            mainImage{
              asset->{
                _id,
                url
              }
            }
          }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  console.log(allPostsData);

  return (
    <div className={theme.layout}>
      <div className={theme.container_layout}>
<div className={theme.blog_banner}>
        <h2 className={theme.banner_title}>Blog Posts</h2>
        <h3 className={theme.banner_subtitle}>
          Welcome to my blog posts page!
        </h3>
<div className={theme.overlay}></div>
</div>
        <div className={`${theme.post_layout} ${theme.mt_3}`}>
          {allPostsData &&
            allPostsData.map((post, index) => (
              <Link href={"/blogs/" + post.slug.current} key={post.slug.current}>
                <span
                  className={theme.post_content}
                  key={index}
                >
                  <Image
                    className={theme.post_image}
                    src={post.mainImage.asset.url}
                    width={500}
                    height={350}
                    alt=""
                  />
                  <span className={theme.post_body}>
                    <h4 className={theme.post_title}>
                      {post.title}
                    </h4>
                  </span>
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}


