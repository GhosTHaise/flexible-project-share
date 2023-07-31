import React from 'react'

type Props = {
    startCursor : string;
    endCursor : string;
    hasPreviousPage : boolean;
    hasNextPage : boolean;
}
const LoadMore = (
    {startCursor,
    endCursor,
    hasPreviousPage,
    hasNextPage} : Props) => {
  return (
    <div>LoadMore</div>
  )
}

export default LoadMore