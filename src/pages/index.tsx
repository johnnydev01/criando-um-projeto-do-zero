import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import Head from 'next/head';
import { FiCalendar, FiUser} from 'react-icons/fi'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostsProps{
  posts: Post[]
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home( { posts }: PostsProps) {
  console.log('Posts', posts);
  return (
   <>
      <Head><title>Desafio | 5</title></Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <img src="/images/logo.svg" alt="Logo desafio 5" />
        </div>
        <div className={styles.posts}> 
          { posts.map(post => (
            <Link key={post.uid} href={`/posts/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p className={styles.subtitle}>{post.data.subtitle}</p>
                <div className={styles.infoPublication}>
                  <FiCalendar/>
                  <time>{post.first_publication_date}</time>
                  <FiUser />
                  <p>{post.data.author}</p>
                </div>
              </a>
            </Link>
          ))
          }
          <button>Carregar mais posts</button>
        </div>

      </main>
   </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author', 'posts.banner', 'posts.content'],
    pageSize: 30,
  });

  console.log(postsResponse.results)
  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })
  return {
    props: {
      posts
    }
}};
