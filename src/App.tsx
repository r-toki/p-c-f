import './App.css';

import { format } from 'date-fns';
import { FC, FormEventHandler, useEffect, useMemo, useState } from 'react';

import * as api from './api-client';
import { Post } from './types';

type PostCreateFormProps = {
  onSubmit: ({ title, body }: { title: string; body: string }) => Promise<void>;
};

const PostCreateForm: FC<PostCreateFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ border: 'solid 1px', borderRadius: '4px', padding: '16px' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div>
          <label>タイトル</label>
          <input
            type="text"
            style={{ display: 'block', width: '100%' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>本文</label>
          <textarea
            style={{ display: 'block', width: '100%' }}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ alignSelf: 'end', padding: '8px 16px' }}>
          投稿
        </button>
      </form>
    </div>
  );
};

type PostItemProps = {
  post: Post;
  onToggleFavorite: () => Promise<void>;
};

const PostItem: FC<PostItemProps> = ({ post, onToggleFavorite }) => {
  const initial = useMemo(() => {
    const names = post.createdBy.split(' ');
    const first = names.at(0) || '';
    const last = names.at(-1) || '';
    return first[0] + '.' + last[0];
  }, [post]);

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        border: 'solid 1px',
        borderRadius: '4px',
        padding: '16px',
      }}
    >
      {/* TODO: Icon 追加 */}
      <div
        style={{
          height: '48px',
          width: '48px',
          border: 'solid 1px',
          borderRadius: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {initial}
      </div>

      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '12px', color: 'gray' }}>
              {format(new Date(post.createdAt), 'yyyy/MM/dd HH:mm')}
            </div>
            <div style={{ fontWeight: 'bold' }}>{post.title}</div>
          </div>
          <button style={{ padding: '8px 16px' }} onClick={onToggleFavorite}>
            {post.isFavorite ? 'お気に入り解除' : 'お気に入り'}
          </button>
        </div>
        <div>{post.body}</div>
      </div>
    </div>
  );
};

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    await api.getPosts().then((res) => setPosts(res.data.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async ({ title, body }: { title: string; body: string }) => {
    await api.createPost({ title, body });
    await fetchPosts();
  };

  const toggleFavoritePost = async (id: number) => {
    await api.toggleFavorite({ id });
  };

  return {
    posts,
    createPost,
    toggleFavoritePost,
  };
};

export const App: FC = () => {
  const { posts, createPost, toggleFavoritePost } = usePosts();

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <PostCreateForm onSubmit={createPost} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {posts.map((p) => (
          <PostItem key={p.id} post={p} onToggleFavorite={() => toggleFavoritePost(p.id)} />
        ))}
      </div>
    </div>
  );
};
