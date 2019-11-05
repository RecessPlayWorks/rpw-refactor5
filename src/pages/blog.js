import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'

import blogStyles from './blog.module.scss'
const BlogPage = () => {
    const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort: {
          fields: publishedDate,
          order: DESC
        }
      ){
        edges {
          node {
            title
            slug
            publishedDate(formatString:"MMM Do, YYYY")
          }
        }
      }
      }
      `)
    //   const {title, date} = data.site.siteMetadata;
    return (
        <Layout>
            <h1>Blog</h1>
            <ol className={blogStyles.posts}>
                {data.allContentfulBlogPost.edges.map((item, idx) => (
                    <li  className={blogStyles.post} key={idx}>
                        <Link to={`/blog/${item.node.slug}`}>
                        <h2>{item.node.title}</h2>
                        <p>{item.node.publishedDate}</p>
                        </Link>
                    </li>
                ))}
                
            </ol>
        </Layout>
    )
}

export default BlogPage;