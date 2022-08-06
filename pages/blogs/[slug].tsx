import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import theme from '../../assets/css/Base.module.scss';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Posts() {
  const [postData, setPostData] = useState(null);
  const router = useRouter();
  const { slug } = router.query

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            slug,
            mainImage{
              asset->{
                _id,
                url
              }
            },
            body,
            "name": author->name,
            "authorImage": author->image
          }`
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div className={theme.loading}>
                        <div className={theme.loader}></div>
                        </div>;

  return (
    <div className={theme.layout}>
      <div className={theme.container_layout}>
<div className={theme.post_container}>
        <div className={theme.relative}>
          <div className={theme.titleContainer}>
            {/* Title Section */}
            <div className={theme.titleContent}>
              <h2 className={theme.titlePost}>
                {postData.title}
              </h2>
            </div>
          </div>
              <div className={theme.post_author}>
                <Image
                  src={urlFor(postData.authorImage).url()}
                  className={theme.image_author}
                  width={40}
                  height={40}
                  alt="Author unangning_EU"
                />
                <h4 className={theme.name_author}>
                  {postData.name}
                </h4>
              </div>
        </div>
<div className={theme.image_postLayout}>
          <Image
            className={theme.image_post}
            src={urlFor(postData.mainImage).url()}
            width={640}
            height={360}
            alt=""
          />
</div>
        <div className={theme.posting} style={{backgroundColor: '#fff', padding: '0 5px'}}>
          <BlockContent
            blocks={postData.body}
            projectId={sanityClient.clientConfig.projectId}
            dataset={sanityClient.clientConfig.dataset}
          />
        </div>
</div>
      </div>
    </div>
  );
}
