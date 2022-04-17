import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'

const Home = (props) => {
  return (
    <>
      <AddNote displayAlert={props.displayAlert} />
      <Notes displayAlert={props.displayAlert} />
    </>
  )
}

export default Home