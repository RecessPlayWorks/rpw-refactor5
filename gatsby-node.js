/* Node Docs on "path" 
https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_basename_path_ext
*/

const path = require("path");

/* This is used to create slugs for Markdown posts &
  is not needed with contentful integration */

// module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions
//     if (node.internal.type === 'MarkdownRemark') {
//         const slug = path.basename(node.fileAbsolutePath, '.md');
//         createNodeField({
//             node,
//             name: 'slug',
//             value: slug
//         })
//     }
// }

/* this fetches contful slugs */
module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const blogTemplate = path.resolve('./src/templates/blog.js');
    const res = await graphql(`
    query {
        allContentfulBlogPost {
            edges {
              node {
                slug
              }
            }
          }
    }
    `)

    /* thanks to Andrew Mead
    https://youtu.be/8t0vNu2fCCM?t=9980

    */
    res.data.allContentfulBlogPost.edges.forEach((edge)=>{
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        }) 
    })

}