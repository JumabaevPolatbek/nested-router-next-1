import { Post } from '@/types/post';
import { User } from '@/types/user';
import { Paper } from '@mui/material';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps: GetServerSideProps<{
	user: User;
	posts: Post[];
}> = async ({ query }) => {
	const requestUser = await fetch(
		`https://jsonplaceholder.typicode.com/users/${query.userId}`
	);
	const dataUser = await requestUser.json();
	const id = query.userId as string;
	const requestPost = await fetch(
		'https://jsonplaceholder.typicode.com/posts'
	);
	const dataPosts: Post[] = await requestPost.json();
	return {
		props: {
			user: dataUser,
			posts: dataPosts.filter(
				(post) => post.userId === +id
			),
		},
	};
};

const index = ({
	user,
	posts,
}: {
	user: User;
	posts: Post[];
}) => {
	const { name, address, phone, id } = user;
	const router = useRouter();
	return (
		<Paper
			elevation={2}
			className='mt-2 py-4 px-3 bg-gray-400'
		>
			<button
				className='py-2 px-3 bg-red-500 text-[18px] checked:bg-red-300 transition-all'
				onClick={() => router.back()}
			>
				Назад
			</button>
			<h3 className='text-center text-[24px] text-bold'>
				{name}
			</h3>
			<div className='flex flex-col border rounded px-3 py-2 my-2'>
				<div></div>
				<div className='flex justify-between items-center py-2'>
					<div>Address</div>
					<div>
						{(address.city, address.street)}
					</div>
				</div>
				<div className='flex justify-between items-center py-2'>
					<div>Телефон :</div>
					<div>{phone}</div>
				</div>
			</div>
			<ul>
				<div className='text-center text-[18px] text-bold'>
					Posts
				</div>
				{posts.map((post) => (
					<li key={post.id}>
						<Link
							href={{
								pathname: `${router.query.id}/comments/${post.id}`,
								query: {
									postId: post.id,
								},
							}}
							className='block py-2 text-[16px] hover:bg-slate-600 cursor-pointer px-2 first-letter:uppercase'
						>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</Paper>
	);
};

export default index;
