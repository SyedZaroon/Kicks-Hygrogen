import React from 'react'

const CollectionLoading = ({pageTitle}) => {
  return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-medium text-gray-600">Loading {pageTitle}...</h2>
      </div>
  )
}

export default CollectionLoading