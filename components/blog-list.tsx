"use client"

import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BlogHeader from "@/components/blog/blog-header"
import TagFilter from "@/components/blog/tag-filter"
import BlogPostsGrid from "@/components/blog/blog-posts-grid"
import PaginationControls from "@/components/blog/pagination-controls"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb"
import { searchBlogPosts } from "@/lib/search"

interface BlogListProps {
  allPosts: BlogPost[];
  allTags: string[];
}

const POSTS_PER_PAGE = 6

/**
 * The query string is the single source of truth for page/tag/search. Every
 * other value here is derived from it during render, so there is no state to
 * keep in sync and no effects: a URL change re-renders with the right list.
 */
export default function BlogList({ allPosts, allTags }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get('tag') || undefined;
  const searchQuery = searchParams.get('q') || "";
  const requestedPage = Number(searchParams.get('page')) || 1;

  const filteredPosts = useMemo(() => {
    let filtered = allPosts;
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }
    if (searchQuery) {
      filtered = searchBlogPosts(filtered, searchQuery);
    }
    return filtered;
  }, [allPosts, selectedTag, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  // Clamp rather than redirect: a stale ?page=9 from a wider result set shows
  // the last real page instead of an empty grid.
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const isFiltering = !!(selectedTag || searchQuery);
  const showFeatured = currentPage === 1 && !isFiltering;

  // Any filter change resets pagination, so `page` is always dropped here.
  const updateQuery = useCallback((mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete('page');
    const query = params.toString();
    router.push(query ? `/blog?${query}` : '/blog', { scroll: false });
  }, [searchParams, router]);

  const handleTagClick = useCallback((tag: string) => {
    updateQuery((params) => {
      if (params.get('tag') === tag) {
        params.delete('tag');
      } else {
        params.set('tag', tag);
      }
    });
  }, [updateQuery]);

  const handleSearch = useCallback((query: string) => {
    updateQuery((params) => {
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
    });
  }, [updateQuery]);

  return (
    <div className="relative overflow-x-hidden">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid grid-cols-1 items-center gap-6 pb-12 pt-8 md:py-10"
      >
        <div className="px-4 sm:px-6 md:px-0">
          <BlogBreadcrumb tag={selectedTag} />
        </div>

        <BlogHeader />

        <BlogSearch
          initialQuery={searchQuery}
          onSearch={handleSearch}
          className="mb-2 px-4 sm:px-6 md:px-0 max-w-md"
        />

        <TagFilter
          allTags={allTags}
          selectedTag={selectedTag}
        />

        <AnimatePresence mode="wait">
          <BlogPostsGrid
            key={`${currentPage}-${selectedTag}-${searchQuery}`}
            posts={paginatedPosts}
            onTagClick={handleTagClick}
            selectedTag={selectedTag}
            searchQuery={searchQuery}
            totalResults={filteredPosts.length}
            showFeatured={showFeatured}
          />
        </AnimatePresence>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
        />

      </motion.section>
    </div>
  );
}
