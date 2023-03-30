import ListComment from "@/components/ListComment";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import Button from "@mui/material/Button/Button";
import Paper from "@mui/material/Paper";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps<{
  comments: Comment[];
  post: Post;
}> = async ({ query }) => {
  const postId = query.postId as string;
  const request = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  const data: Comment[] = await request.json();
  const requestPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return {
    props: {
      comments: data.filter((comment) => comment.postId === +postId),
      post: await requestPost.json(),
    },
  };
};

const comments = ({ comments, post }: { comments: Comment[]; post: Post }) => {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <Paper elevation={2} className="mt-2 py-2 px-2 bg-slate-400">
      <button
        className="py-2 px-3 bg-red-500 text-[18px] checked:bg-red-300 transition-all"
        onClick={handleBack}
      >
        Назад
      </button>
      <h3 className="text-center font-bold text-[24px] first-letter:uppercase">
        {post.title}
      </h3>
      <div className="text-center text-[18px] first-letter:uppercase">
        {post.body}
      </div>
      <div className="pl-5">
        <div>Comments</div>
        {comments.map(({ body, id, email }) => (
          <ListComment key={id} body={body} email={email} />
        ))}
      </div>
    </Paper>
  );
};

export default comments;
