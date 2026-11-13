import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as bootstrap from 'bootstrap';
import {
  ArrowLeft,
  MessageSquare,
  Play,
  ThumbsUp,
  Trash2,
  Send,
  Youtube,
  ExternalLink,
} from 'lucide-react';
import {
  BLOG_POSTS,
  BlogComment,
  YOUTUBE_VIDEOS,
  YouTubeVideoItem,
} from '../data/siteContent';

interface BlogVideoPageProps {
  onBackToMain: () => void;
}

const STORAGE_KEY = 'kadencia_blog_comments_v1';

const CATEGORIES = [
  'ყველა',
  'მობილური ადაპტაცია',
  'მუქი დიზაინი',
  'JavaScript',
] as const;

function parseYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace('/', '').split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (url.hostname.includes('youtube.com')) {
      const vParam = url.searchParams.get('v');
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) return vParam;
      const parts = url.pathname.split('/').filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts');
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        const candidate = parts[embedIdx + 1];
        return /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

function buildInitialCommentsMap(): Record<string, BlogComment[]> {
  const base: Record<string, BlogComment[]> = {};
  for (const post of BLOG_POSTS) {
    base[post.id] = post.initialComments;
  }
  return base;
}

export const BlogVideoPage: React.FC<BlogVideoPageProps> = ({ onBackToMain }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ყველა');
  const [activePostId, setActivePostId] = useState<string>(BLOG_POSTS[0].id);

  // Comments persisted via localStorage
  const [commentsByPost, setCommentsByPost] = useState<Record<string, BlogComment[]>>(() => {
    const fallback = buildInitialCommentsMap();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as Record<string, BlogComment[]>;
      return { ...fallback, ...parsed };
    } catch {
      return fallback;
    }
  });

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  // YouTube Video Player State
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(YOUTUBE_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem>(YOUTUBE_VIDEOS[0]);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [youtubeError, setYoutubeError] = useState<string | null>(null);

  // Bootstrap Toast notification state
  const toastRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsByPost));
    } catch {
      // Ignore storage quota errors
    }
  }, [commentsByPost]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastRef.current) {
      const toastInstance = bootstrap.Toast.getOrCreateInstance(toastRef.current, {
        delay: 3200,
      });
      toastInstance.show();
    }
  };

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'ყველა') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activePost = useMemo(() => {
    return (
      filteredPosts.find((p) => p.id === activePostId) ||
      filteredPosts[0] ||
      BLOG_POSTS[0]
    );
  }, [filteredPosts, activePostId]);

  const activeComments = commentsByPost[activePost.id] || [];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const author = commentAuthor.trim();
    const text = commentText.trim();

    if (author.length < 2) {
      setCommentError('გთხოვთ მიუთითოთ თქვენი სახელი (მინიმუმ 2 სიმბოლო).');
      return;
    }
    if (text.length < 4) {
      setCommentError('გთხოვთ დაწეროთ კომენტარი (მინიმუმ 4 სიმბოლო).');
      return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');

    const newComment: BlogComment = {
      id: `user-${Date.now()}`,
      author,
      text,
      createdAt: `დღეს · ${hours}:${mins}`,
      likes: 0,
      isUserCreated: true,
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [activePost.id]: [newComment, ...(prev[activePost.id] || [])],
    }));

    setCommentAuthor('');
    setCommentText('');
    setCommentError(null);
    showToast('თქვენი კომენტარი წარმატებით დაემატა.');
  };

  const handleLikeComment = (commentId: string) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [activePost.id]: (prev[activePost.id] || []).map((item) =>
        item.id === commentId ? { ...item, likes: item.likes + 1 } : item
      ),
    }));
  };

  const handleDeleteComment = (commentId: string) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [activePost.id]: (prev[activePost.id] || []).filter(
        (item) => item.id !== commentId
      ),
    }));
    showToast('კომენტარი წაიშალა.');
  };

  const handleLoadCustomYoutube = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = parseYouTubeId(customYoutubeUrl);
    if (!ytId) {
      setYoutubeError(
        'გთხოვთ ჩასვათ სწორი YouTube ბმული (მაგ: https://www.youtube.com/watch?v=...)'
      );
      return;
    }

    setYoutubeError(null);
    const customItem: YouTubeVideoItem = {
      id: `custom-${ytId}`,
      youtubeId: ytId,
      title: 'მომხმარებლის დამატებული YouTube ვიდეო',
      channel: 'YouTube ბმული',
      duration: 'პირდაპირი ჩვენება',
      description: `ჩატვირთული ვიდეო ID: ${ytId}`,
    };

    setVideos((prev) => {
      const exists = prev.some((v) => v.youtubeId === ytId);
      return exists ? prev : [customItem, ...prev];
    });
    setActiveVideo(customItem);
    setCustomYoutubeUrl('');
    showToast('YouTube ვიდეო ჩაიტვირთა.');
  };

  return (
    <div className="bg-[#0A0B0E] py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page 2 Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <span className="font-mono tabular-nums">გვერდი 2</span>
              <span aria-hidden="true">·</span>
              <span>ბლოგი და YouTube ვიდეო</span>
            </div>
            <h1
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F5]"
              style={{ textWrap: 'balance' }}
            >
              ტექნიკური ბლოგი, კომენტარები და ვიდეო მასალები
            </h1>
          </div>

          <button
            type="button"
            onClick={onBackToMain}
            className="btn inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#12141A] px-4 py-2 text-sm font-medium text-zinc-100 hover:border-amber-400/60 hover:text-white whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <span>1 · მთავარ გვერდზე დაბრუნება</span>
          </button>
        </div>

        {/* Category Filter Tabs (Interactive Buttons) */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  const firstMatch =
                    category === 'ყველა'
                      ? BLOG_POSTS[0]
                      : BLOG_POSTS.find((p) => p.category === category);
                  if (firstMatch) setActivePostId(firstMatch.id);
                }}
                className={`min-h-[44px] rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 font-semibold'
                    : 'border border-white/10 bg-[#12141A] text-zinc-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Bootstrap 12-Col Grid: Blog List + Active Article & Comments */}
        <div className="row g-4 mt-4">
          {/* Left Column: Compact Blog Posts Selector */}
          <div className="col-12 col-lg-5">
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const isSelected = post.id === activePost.id;
                const count = (commentsByPost[post.id] || []).length;
                return (
                  <article
                    key={post.id}
                    className={`card rounded-xl border transition-colors ${
                      isSelected
                        ? 'border-amber-400/60 bg-[#161922]'
                        : 'border-white/10 bg-[#12141A] hover:border-white/25'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePostId(post.id)}
                      className="card-body w-full p-5 text-left"
                    >
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="font-mono tabular-nums text-amber-400">
                          {post.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="mt-2.5 text-base sm:text-lg font-semibold leading-snug text-[#F4F4F5]">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs text-zinc-400">
                        <span>{post.publishedAt}</span>
                        <span className="inline-flex items-center gap-1.5 text-zinc-300 tabular-nums">
                          <MessageSquare className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                          <span>კომენტარები ({count})</span>
                        </span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Article Content + Interactive Comments */}
          <div className="col-12 col-lg-7">
            <div className="card rounded-xl border border-white/10 bg-[#12141A]">
              <div className="card-body p-5 sm:p-8">
                {/* Article Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                  <span className="font-mono tabular-nums text-amber-400">
                    {activePost.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePost.readTime}</span>
                </div>

                <h2 className="mt-3 font-display text-xl sm:text-2xl font-semibold leading-snug text-[#F4F4F5]">
                  {activePost.title}
                </h2>

                <div className="mt-5 space-y-4 border-b border-white/[0.08] pb-6 text-sm sm:text-base leading-relaxed text-zinc-300">
                  {activePost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[#F4F4F5]">
                      <MessageSquare className="h-4 w-4 text-amber-400" aria-hidden="true" />
                      <span className="tabular-nums">
                        კომენტარები ({activeComments.length})
                      </span>
                    </h3>
                  </div>

                  {/* Bootstrap Comment Form */}
                  <form onSubmit={handleAddComment} noValidate className="mt-4 space-y-3">
                    <div>
                      <label
                        htmlFor="blog-comment-author"
                        className="form-label mb-1 text-xs font-medium text-zinc-300"
                      >
                        თქვენი სახელი
                      </label>
                      <input
                        id="blog-comment-author"
                        type="text"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        placeholder="მაგ: დავით მაისურაძე"
                        className="form-control min-h-[44px] rounded-lg border-white/12 bg-[#0A0B0E] text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:shadow-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="blog-comment-text"
                        className="form-label mb-1 text-xs font-medium text-zinc-300"
                      >
                        დაწერეთ კომენტარი
                      </label>
                      <textarea
                        id="blog-comment-text"
                        rows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="გაგვიზიარეთ თქვენი მოსაზრება სტატიის შესახებ..."
                        className="form-control rounded-lg border-white/12 bg-[#0A0B0E] text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:shadow-none"
                      />
                    </div>

                    {commentError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                      >
                        {commentError}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400 whitespace-nowrap"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>კომენტარის გამოქვეყნება</span>
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="mt-6 divide-y divide-white/[0.08] border-t border-white/[0.08]">
                    {activeComments.map((comment) => (
                      <div key={comment.id} className="py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-zinc-100">
                              {comment.author}
                            </div>
                            <div className="text-xs text-zinc-500">
                              {comment.createdAt}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleLikeComment(comment.id)}
                              aria-label="კომენტარის მოწონება"
                              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#0A0B0E] px-2.5 text-xs text-zinc-300 hover:border-amber-400/50 hover:text-amber-400 tabular-nums"
                            >
                              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{comment.likes}</span>
                            </button>

                            {comment.isUserCreated && (
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                aria-label="კომენტარის წაშლა"
                                className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-white/10 bg-[#0A0B0E] text-zinc-400 hover:border-red-400/50 hover:text-red-300"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated YouTube Video Section on Page 2 */}
        <section
          id="youtube-section"
          aria-label="YouTube ვიდეო განყოფილება"
          className="mt-12 border-t border-white/[0.08] pt-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-400">
                <Youtube className="h-4 w-4" aria-hidden="true" />
                <span>YouTube ვიდეო განყოფილება</span>
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F5]">
                სასწავლო და ტექნიკური ვიდეოები
              </h2>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/12 bg-[#12141A] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 hover:border-amber-400/60 hover:text-white whitespace-nowrap"
            >
              <span>YouTube-ზე გახსნა</span>
              <ExternalLink className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            </a>
          </div>

          <div className="row g-4 mt-4">
            {/* Responsive Bootstrap 16:9 YouTube Player */}
            <div className="col-12 col-lg-8">
              <div className="card overflow-hidden rounded-xl border border-white/10 bg-[#12141A]">
                <div className="ratio ratio-16x9 bg-black">
                  <iframe
                    key={activeVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="border-0"
                  />
                </div>
                <div className="card-body p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span>{activeVideo.channel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{activeVideo.duration}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-[#F4F4F5]">
                    {activeVideo.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                    {activeVideo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Playlist & Custom YouTube URL Switcher */}
            <div className="col-12 col-lg-4">
              <div className="card h-full rounded-xl border border-white/10 bg-[#12141A]">
                <div className="card-body flex flex-col justify-between p-5">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      ვიდეოების სია
                    </h3>
                    <div className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                      {videos.map((video) => {
                        const isPlaying = video.youtubeId === activeVideo.youtubeId;
                        return (
                          <button
                            key={video.id}
                            type="button"
                            onClick={() => setActiveVideo(video)}
                            className={`flex min-h-[60px] w-full items-start gap-3 py-3 text-left transition-colors ${
                              isPlaying
                                ? 'text-amber-400'
                                : 'text-zinc-200 hover:text-amber-300'
                            }`}
                          >
                            <Play
                              className={`mt-1 h-4 w-4 shrink-0 ${
                                isPlaying ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'
                              }`}
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-medium leading-snug line-clamp-2">
                                {video.title}
                              </div>
                              <div className="mt-1 text-xs text-zinc-400 tabular-nums">
                                {video.channel} · {video.duration}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom YouTube URL Input */}
                  <form onSubmit={handleLoadCustomYoutube} className="mt-5">
                    <label
                      htmlFor="custom-youtube-url"
                      className="form-label mb-1.5 text-xs font-medium text-zinc-300"
                    >
                      სხვა YouTube ვიდეოს ჩასმა (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="custom-youtube-url"
                        type="text"
                        value={customYoutubeUrl}
                        onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="form-control min-h-[44px] rounded-lg border-white/12 bg-[#0A0B0E] text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:shadow-none"
                      />
                      <button
                        type="submit"
                        className="btn min-h-[44px] rounded-lg bg-amber-500 px-3.5 text-xs font-semibold text-zinc-950 hover:bg-amber-400 whitespace-nowrap shrink-0"
                      >
                        ჩართვა
                      </button>
                    </div>
                    {youtubeError && (
                      <p className="mt-2 text-xs text-red-300">{youtubeError}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bootstrap Toast Notification Container */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
        <div
          ref={toastRef}
          className="toast align-items-center border border-amber-400/40 bg-[#161922] text-zinc-100"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body text-sm">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="დახურვა"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
