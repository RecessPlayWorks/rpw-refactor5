import React from 'react'
import {  graphql } from 'gatsby'
import { documentToReactComponents} from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'


export const query = graphql`
query($slug: String!){ 
  contentfulBlogPost(slug: {eq: $slug}){
    title
    publishedDate(formatString: "MMMM Do, YYYY")
    body {
      json
    }
  }
}
`

/* Thx to Andrew Mead */
/* https://youtu.be/8t0vNu2fCCM?t=14821 */
const Blog = (props) => {
  const options = {
   renderNode: {
     "embedded-asset-block": (node) => {
       const alt=node.data.target.fields.title['en-US']
       const url=node.data.target.fields.file['en-US'].url
       return <img alt={alt} src={`https:${url}`}/>
     }
   }
  }
    return (
    <Layout>
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.date}</p>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}     
    </Layout>
)
}

export default Blog;

/*

for md

// export const query = graphql`
// query ($slug: String){
//     markdownRemark (
//       fields: {
//         slug: {
//           eq: $slug
//         }
//       }
//     ) {
//       frontmatter {
//         title
//         date
//       }
//       html
//     }
//   }
// `


<h1>{props.data.markdownRemark.frontmatter.title}</h1>
<p>{props.data.markdownRemark.frontmatter.date}</p>

<div dangerouslySetInnerHTML={{__html:props.data.markdownRemark.html}}></div>


*/