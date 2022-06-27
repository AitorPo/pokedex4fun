import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import List from "./List";


function PaginatedList(_props:any) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + _props.itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(_props.list.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(_props.list.length / _props.itemsPerPage));
      
    }, [itemOffset, _props]);

    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * _props.itemsPerPage) % _props.list.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);

    };
    console.log(currentItems)
    return (
        <>
            <List currentItems={currentItems}
                  list={_props.list}
                  search={_props.search}/>
            <ReactPaginate
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
            />
            
        </>
        
    )
    
}  

export default PaginatedList;