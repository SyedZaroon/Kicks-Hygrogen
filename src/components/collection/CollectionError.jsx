import React from 'react'

const CollectionError = ({error}) => {
  return (
          <div className="max-w-md mx-auto my-16 p-6 border border-red-200 bg-red-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Occurred</h3>
        <p className="text-sm text-red-600">{error}</p>
      </div>
  )
}

export default CollectionError