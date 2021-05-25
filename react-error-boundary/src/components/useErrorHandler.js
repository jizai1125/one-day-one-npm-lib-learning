import React from 'react'

function useErrorHandler(givenError) {
  const [error, setError] = React.useState(null)
  if(givenError) throw givenError
  if(error) throw error
  return setError
}

export default useErrorHandler