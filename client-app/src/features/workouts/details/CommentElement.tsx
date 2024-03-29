import React, { ReactNode } from 'react';
import { Image } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';


interface Props {
	children?: ReactNode;
}

export default function CommentElement({children}: Props) {
	return (
		<div className="d-flex flex-start mt-4">
			<Image
			className="rounded-circle shadow-1-strong me-3"
			src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
			alt="avatar"
			width="65"
			height="65"
			/>

			<div className="flex-grow-1 flex-shrink-1">
				<div>
					<div className="d-flex justify-content-between align-items-center">
						<p className="mb-1">
						Simona Disa <span className="small">- 3 hours ago</span>
						</p>
					</div>
					<p className="small mb-0">
						letters, as opposed to using 'Content here, content here', making it
						look like readable English.
					</p>
					<div className="small d-flex justify-content-start w-100">
						<a href="#!" className="d-flex align-items-center me-3">
							<FaThumbsUp className="me-2" />
							<p className="mb-0">Like</p>
						</a>
				  	</div>
				</div>
				{children}
			</div>
		</div>

	)
}