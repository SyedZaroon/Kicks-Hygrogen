const CollectionInfo = ({pageTitle, productCount})=>{
    return(
             <div className="border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">
          {pageTitle}
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {productCount} Items
          </span>
        </h1>
      </div>
    )
}

export default CollectionInfo 