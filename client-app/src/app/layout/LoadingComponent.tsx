import React from 'react';

interface Props {
	inverted?: boolean;
	content: string;
}

export default function LoadingComponent({inverted = true, content }:Props) {
	return (
	<div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="loader"></div>
      <p>{content}</p>
    </div>
	)
}