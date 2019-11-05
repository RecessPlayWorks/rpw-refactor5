import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const Indexpage = () => {
    return(
        <Layout>
            <h1>Hello</h1>
            <h2>This is RPW Gatsby Refactor</h2>
            <p>Need a dev?</p>
            <br/>
            <Link to="/contact">contact me</Link>
        </Layout>
    )
}

export default Indexpage;