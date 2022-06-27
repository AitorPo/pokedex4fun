import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import pokeball from '../pokeball.svg'
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
      setCurrentItems(_props.list.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(_props.list.length / _props.itemsPerPage));
      
    }, [itemOffset, _props]);

    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * _props.itemsPerPage) % _props.list.length;
      setItemOffset(newOffset);
    };

    return (
        <>
            <div className="container">
                <List currentItems={currentItems}
                    list={_props.list}
                    search={_props.search}/>
            </div>
            <div id="secondary-footer">
                <ReactPaginate
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel={<img className='pokeball' src={pokeball}/>}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="center"
                    activeClassName="active"
                    renderOnZeroPageCount={undefined}
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                />
                </div>
        </>
    )
}  

export default PaginatedList;