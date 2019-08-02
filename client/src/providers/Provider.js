import React from 'react'

const Provider = ({providers, children}) => {

  const nestItems = (n=0) => {
    if(providers.length == n) return children;
    let Provider = providers[n]
    return <Provider>
      {nestItems(n+1)}
    </Provider>
  }

  return nestItems();
}

export default Provider