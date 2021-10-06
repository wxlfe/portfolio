import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image";

export const query = graphql`
{
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
}
`;

const ExperiencePage = ({ data }) => {
  const jobs = data.allSanityJob.edges;

  function sortByStartDate (a, b) {
    if (parseInt(a.node.startDate.split('/')[1]) > parseInt(b.node.startDate.split('/')[1])) {
      return -1;
    }
    if (parseInt(a.node.startDate.split('/')[1]) === parseInt(b.node.startDate.split('/')[1])) {
      if (parseInt(a.node.startDate.split('/')[0]) > parseInt(b.node.startDate.split('/')[0])) {
        return -1;
      }
      if (parseInt(a.node.startDate.split('/')[0]) === parseInt(b.node.startDate.split('/')[0])) {
        return 0;
      }
      if (parseInt(a.node.startDate.split('/')[0]) < parseInt(b.node.startDate.split('/')[0])) {
        return 1;
      }
    }
    if (parseInt(a.node.startDate.split('/')[1]) < parseInt(b.node.startDate.split('/')[1])) {
      return 1;
    }
  }

  jobs.sort(sortByStartDate);

  return (
    <Layout>
      <Seo title="Experience" />
      <ul style={{ margin: '0' }}>
        {jobs.map(({ node: job }) => (
          
            <li key={ job.title } style={{listStyle: 'none'}}>
              <div style={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                marginBottom: '3rem'
              }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div style={{ maxWidth: '10rem', padding: '1rem', backgroundColor: 'white', borderRadius: '1rem' }}>
                      <GatsbyImage alt={`${job.company} logo`} image={job.companyLogo.asset.gatsbyImageData} backgroundColor="white" style={{ maxWidth: '10rem' }}/>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '1em' }}>
                      <h2 style={{ borderBottom: '4px solid var(--accent)' }}>{job.title}</h2>
                    </div>
                    <h4>{job.company}, { job.startDate } - { job.endDate }</h4>
                    <Link to={'/job/' + job?.slug?.current}>
                      <p>More Information</p>
                    </Link>
                  </div>
              </div>
            </li>
        ))}
      </ul>
    </Layout>
  );
}

export default ExperiencePage
