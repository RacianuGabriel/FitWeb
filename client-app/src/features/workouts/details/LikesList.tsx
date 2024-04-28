import { observer } from 'mobx-react-lite'
import React from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import { Profile } from '../../../app/models/profile';
import { Link } from 'react-router-dom';

interface Props {
	attendees: Profile[];
}

export default observer (function LikesList({attendees}: Props){
	return (
		<ListGroup>
			{attendees.map(attendee => (
				<ListGroup.Item key={attendee.username} 
					as={Link} to={`/profiles/${attendee.username}`}>
					<Image 
						roundedCircle
						src={attendee.image || '/assets/user.png'}
						width={25}
						height={25}/>
					<span className='ms-2'>{attendee.displayName}</span>
				</ListGroup.Item>
			))}
					
		</ListGroup>
	)
})