import React from 'react'
import Link from 'gatsby-link'
import MenuItem from '../components/Menuitem'
import Header from '../components/Header'
import logo from '../Group 40-min.png'
import '../layouts/style.css'
import data from '../content/event'


const menu = [
  {
    title: 'ABOUT SHUFFLE',
    styles: 'bg-og tx-ma',
    path: '/about',
    isActive: false,
  },
  {
    title: 'MAKER SPACE',
    styles: 'bg-bl tx-gr',
    path: '/makerspace',
    isActive: false,
  },

  {
    title: 'CO-WORKING SPACE',
    styles: 'bg-ma tx-og',
    path: '/coworking',
    isActive: false,
  },
  {
    title: 'UPCOMING EVENTS',
    styles: 'bg-gr tx-bl',
    path: '/events',
    isActive: true,
  },
]

const EventItem = ({index, date, title, by, from, to}) => {
  const bigger = index == 0 ? 'h1' : ''
  return (
    <div className="event-item tx-ma">
      <h2 className={`${bigger} bold all-caps`}> {date} </h2>
      <h3 className={`${bigger} bold italic`}> {title} </h3>
      <h3 className={`${bigger} small italic `}> with {by} </h3>
      <h4 className=""> {from} to {to} </h4>
      <h4 className="tx-bl"> LINK TO EVENT </h4>
      <hr className="bg-og" />
    </div>
  )
}

// const bigger = index == 0 ? 'h1' : '';

const AboutPage = () => (
  <div>
   <Header />
    <div className="flex-wrap row-eq-height">
      <div className="col-md-6 no-pad">
        <div className="d-flex flex-column">
        {menu.map((item) => (
          <MenuItem title={item.title} styles={item.styles} path={item.path} isActive={item.isActive} />
        ))}
        </div>

      </div>
      <div className="col-md-6 mtop">
        <div className="event-container">
          {data.map((event, index) => (
            <EventItem index={index} date={event.date} title={event.title} by={event.by}
                       from={event.from} to={event.to} />
          ))}
        </div>
      </div>
    </div>
  </div>
)


// const bigger = index == 0 ? 'h1' : ''
export default ({ data }) => {
  console.log("data",data);
  const bigger = data.allMarkdownRemark.edges[0];
  console.log("data0", bigger);

  return (
    <div>
     <Header />
      <div className="flex-wrap row-eq-height">
        <div className="col-md-6 no-pad">
          <div className="d-flex flex-column">
          {menu.map((item) => (
            <MenuItem title={item.title} styles={item.styles} path={item.path} isActive={item.isActive} />
          ))}
          </div>

        </div>
        <div className="col-md-6 mtop">
          <div className="event-container">
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <div key={node.id}>
                <div className="event-item tx-ma">
                  <h2 className={`${bigger} bold all-caps`}>Marchhhh</h2>
                  <h3 className={`${bigger} bold italic`}>{node.frontmatter.title}</h3>
                  <h3 className={`${bigger} small italic`}> with {node.frontmatter.by}</h3>
                  <h4 className="">{node.frontmatter.start} to {node.frontmatter.end}</h4>
                  <p className="tx-bl">{node.excerpt}</p><br />
                  <h4 className="tx-bl"> LINK TO EVENT </h4>
                  <hr className="bg-og" />
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC } limit: 5,
    filter: {fileAbsolutePath: {regex: "/(events)/.*\\.md$/"}}) {
      edges {
        node {
          id
          frontmatter {
            title
            by
            start
            end
         }
          excerpt(pruneLength: 400)
        }
      }
    }
  }`;
