import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import List from './List';

function InfiniteScrollPage() {
    
    const [items, setItems] = useState([]);
    const [more, setMore] = useState(true);
    const [page, setPage] = useState(2);

    useEffect(() => {
        getComments();
    }, []);

    // to get the first 20 comments
    const getComments = async () => {
        const res = await fetch(`http://localhost:3004/comments?_page=1&_limit=20`);
        const data = await res.json();
        setItems(data);
    }
    
    // to load next comments
    const fetchComments = async () => {
        const res = await fetch(`http://localhost:3004/comments?_page=${page}&_limit=20`);
        const data = await res.json();
        return data;

    }

    // fetchData
    const fetchData = async () => {
        const commentsFromServer = await fetchComments();
        setItems([...items, ...commentsFromServer]);
        if(commentsFromServer.length === 0 || commentsFromServer.length < 20){
            setMore(false);
        }
        setPage(page + 1);
    }

    return (
        <>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchData}
                hasMore={more}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {items.map((val) => (
                    <List key={val.id} id={val.id} name={val.name} email={val.email} body={val.body} />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default InfiniteScrollPage;