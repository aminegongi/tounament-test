/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Layout from '../shared/components/layout/Layout'
import Error from '../shared/components/PageError'

function NotFound() {
  return (
    <Layout>
      <Error statusCode={404} description="Oops!!!" />
    </Layout>
  )
}

export default NotFound
