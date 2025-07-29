import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { fetchGrandmasters } from "../../utils/api";

function GrandmastersList() {
  const [gms, setGms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  
  const navigate = useNavigate();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const result = await fetchGrandmasters(offset, 20);
      setGms(prevGms => [...prevGms, ...result.players]);
      setHasMore(result.hasMore);
      setOffset(prevOffset => prevOffset + 20);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chess Grandmasters</h1>
      <InfiniteScroll
        dataLength={gms.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<div className={styles.loading}>Loading more grandmasters...</div>}
      >
        <ul className={styles.list}>
          {gms.map((gm) => (
            <li
              key={gm}
              className={styles.item}
              style={{ cursor: 'pointer', color: '#0074cc' }}
              onClick={() => navigate(`/gm/${gm}`)}
            >
              {gm}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default GrandmastersList; 