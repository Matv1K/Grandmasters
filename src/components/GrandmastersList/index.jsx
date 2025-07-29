import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useGrandmasters } from "../../hooks/useGrandmasters";
import { UI_CONFIG } from "../../constants";

function GrandmastersList() {
  const navigate = useNavigate();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useGrandmasters(UI_CONFIG.INFINITE_SCROLL_LIMIT);

  const allGrandmasters = data?.pages.flatMap(page => page.players) || [];

  const handleLoadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleGrandmasterClick = (username) => {
    navigate(`/gm/${username}`);
  };

  if (isError) {
    return (
      <div className={styles.error}>
        Error: {error?.message || 'Failed to load grandmasters'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chess Grandmasters</h1>
      
      <InfiniteScroll
        dataLength={allGrandmasters.length}
        next={handleLoadMore}
        hasMore={hasNextPage}
        loader={
          <div className={styles.loading}>
            {isFetchingNextPage ? "Loading more grandmasters..." : "Loading..."}
          </div>
        }
      >
        <ul className={styles.list}>
          {allGrandmasters.map((username) => (
            <li
              key={username}
              className={styles.item}
              onClick={() => handleGrandmasterClick(username)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleGrandmasterClick(username);
                }
              }}
              aria-label={`View profile for ${username}`}
            >
              {username}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default GrandmastersList; 