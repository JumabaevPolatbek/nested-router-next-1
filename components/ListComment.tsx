import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

export default function ListComment({
	body,
	email,
}: {
	body: string;
	email: string;
}) {
	return (
		
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<PersonIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={body}
					secondary={email}
				/>
			</ListItem>
	);
}
