"use client"

import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import BlogHeader from "@/components/blog/blog-header"
import TagFilter from "@/components/blog/tag-filter"
import BlogPostsGrid from "@/components/blog/blog-posts-grid"
import PaginationControls from "@/components/blog/pagination-controls"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb"
import { searchBlogPosts } from "@/lib/search"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

// --- Featured Post Hero ---
function FeaturedPostHero({ post }: { post: BlogPost }) {
  const firstTag = post.tags?.[0]

  return (
    <motion.div variants={fadeInUp} className="px-4 sm:px-6 md:px-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3">
        Featured Post
      </p>
      <Link href={`/blog/${post.id}`} className="group block">
        {/* Cover image / gradient banner */}
        <div
          className="relative w-full overflow-hidden rounded-xl border border-border/60 mb-5"
          style={{ height: '40vh', minHeight: '220px', maxHeight: '380px' }}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-background" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          {/* Badge in corner */}
          {firstTag && (
            <div className="absolute top-4 left-4">
              <Badge variant="tech" className="text-xs">
                {firstTag}
              </Badge>
            </div>
          )}
        </div>

        {/* Text content */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 max-w-2xl">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
        <span className={buttonVariants({ size: 'sm', className: 'gap-1.5 pointer-events-none' })}>
          Read article <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>

      <div className="h-px bg-border/50 my-8" />
    </motion.div>
  )
}

interface BlogListProps {
  allPosts: BlogPost[];
  allTags: string[];
}

export default function BlogList({ allPosts, allTags }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allPosts);
  const [paginatedPosts, setPaginatedPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = 6;
  const featuredPost = allPosts[0] ?? null;
  const isFiltering = !!(selectedTag || searchQuery);

  useEffect(() => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('q') || "";

    setCurrentPage(page);
    setSelectedTag(tag);
    setSearchQuery(search);
  }, [searchParams]);

  useEffect(() => {
    let filtered = allPosts;

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags && post.tags.includes(selectedTag));
    }

    if (searchQuery) {
      filtered = searchBlogPosts(filtered, searchQuery);
    }

    setFilteredPosts(filtered);

    const total = Math.ceil(filtered.length / postsPerPage);
    setTotalPages(total);

    if (currentPage > total && total > 0) {
      setCurrentPage(1);
    }
  }, [selectedTag, searchQuery, allPosts, currentPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setPaginatedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTag === tag) {
      params.delete('tag');
      setSelectedTag(undefined);
    } else {
      params.set('tag', tag);
      setSelectedTag(tag);
    }

    params.delete('page');
    setCurrentPage(1);
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const handleSearch = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    params.delete('page');
    setCurrentPage(1);
    setSearchQuery(query);
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10" />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-center gap-6 pb-12 pt-8 md:py-10"
      >
        <div className="px-4 sm:px-6 md:px-0">
          <BlogBreadcrumb tag={selectedTag} />
        </div>

        <BlogHeader />

        {/* Featured hero — hidden while filtering/searching */}
        <AnimatePresence>
          {!isFiltering && featuredPost && (
            <FeaturedPostHero post={featuredPost} />
          )}
        </AnimatePresence>

        <BlogSearch
          onSearch={handleSearch}
          className="mb-2 px-4 sm:px-6 md:px-0 max-w-md"
        />

        <TagFilter
          allTags={allTags}
          selectedTag={selectedTag}
        />

        <BlogPostsGrid
          posts={paginatedPosts}
          onTagClick={handleTagClick}
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          totalResults={filteredPosts.length}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block" />
        <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block" />
      </motion.section>
    </div>
  );
}
