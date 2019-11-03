import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import Nav from '../../components/nav'
import GlobalStyles from '../../components/styles'

const AuthorAttribute = ({ name, children }) => {
  return (
    <div className='card'>
      <h3>{name}</h3>
      <div>
        {children}
      </div>
    </div>
  )
}

const CompanyHashTags = ({ tags }) => {
  return (
    <>
      <ul>
        {tags.map((tag, index) => <li key={index}>{tag}</li>)}
      </ul>
      <style jsx>{`
        ul {
          list-style-type: none;
          padding-left: 0;
          display: block;
        }
        li {
          display: inline;
          margin-right: 0.5ch;
        }
        li::before {
          content: '#';
        }
      `}</style>
    </>
  )
}

const Address = ({ address }) => {
  return (
    <address>
      {['street', 'suite', 'city', 'zipcode'].map((key, index) => (
        <p key={index}>{address[key]}</p>
      ))}
    </address>
  )
}

const Posts = ({ author }) => (
  <div>
    <Head>
      <title>Author</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>{author.name}</h1>
      <p className='description'>
        <a href='#' onClick={() => Router.back()}>&larr; Go Back</a>
      </p>

      <div className='description'>
        <h2>Details</h2>
      </div>
      <div className='row'>
        <AuthorAttribute name="Username">{author.username}</AuthorAttribute>
        <AuthorAttribute name="Email">
          <a href={`mailto:${author.email}`}>{author.email}</a>
        </AuthorAttribute>
        <AuthorAttribute name="Phone">
          <a href={`call:${author.phone}`}>{author.phone}</a>
        </AuthorAttribute>
        <AuthorAttribute name="Address">
          <Address address={author.address} />
        </AuthorAttribute>
        <AuthorAttribute name="Website">
          <Link href={author.website}>
            <a>{author.website}</a>
          </Link>
        </AuthorAttribute>
        <AuthorAttribute name="Company">
          <h4>{author.company.name}</h4>
          <p>{author.company.catchPhrase}</p>
          <CompanyHashTags tags={author.company.bs.split(' ')} />
        </AuthorAttribute>
      </div>
    </div>

    <GlobalStyles />
  </div>
)

Posts.getInitialProps = async ({ query }) => {
  const { id } = query;
  const author = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(({ data }) => data)

  return {
    author
  }
}

export default Posts
