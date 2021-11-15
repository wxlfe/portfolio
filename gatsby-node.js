/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const {isFuture} = require('date-fns')

async function createProjectPages (graphql, actions) {
    const {createPage} = actions
    const result = await graphql(`
    {
        allSanityProject {
          edges {
            node {
              description
              id
              image {
                asset {
                  gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
              }
              skills {
                slug {
                  current
                }
                title
              }
              slug {
                current
              }
              title
              year
            }
          }
        }
        allSanityJob {
          edges {
            node {
              id
              title
              company
              companyLogo {
                asset {
                  gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
              }
              startDate
              endDate
              slug {
                current
              }
            }
          }
        }
        allSanitySkill {
          edges {
            node {
              certifications
              description
              id
              skillIcon {
                asset {
                  gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
                }
              }
              slug {
                current
              }
              title
            }
          }
        }
      }
    `)
  
    if (result.errors) throw result.errors
  
    const projectEdges = (result.data.allSanityProject || {}).edges || []
  
    projectEdges
      .forEach(edge => {
        const id = edge.node.id
        console.log('id: ', id);
        const slug = edge.node.slug.current
        const path = `/project/${slug}/`
  
        createPage({
          path,
          component: require.resolve('./src/templates/project.tsx'),
          context: {id}
        })
      })

    const jobEdges = (result.data.allSanityJob || {}).edges || []
  
    jobEdges
      .forEach(edge => {
        const id = edge.node.id
        const slug = edge.node.slug.current
        const path = `/job/${slug}/`
  
        createPage({
          path,
          component: require.resolve('./src/templates/job.tsx'),
          context: {id}
        })
      })

    const skillEdges = (result.data.allSanitySkill || {}).edges || []
  
    skillEdges
      .forEach(edge => {
        const id = edge.node.id
        const slug = edge.node.slug.current
        const path = `/skill/${slug}/`
  
        createPage({
          path,
          component: require.resolve('./src/templates/skill.tsx'),
          context: {id}
        })
      })
  }
  
  exports.createPages = async ({graphql, actions}) => {
    await createProjectPages(graphql, actions);
  }