import React from 'react';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';
import icon2 from '../../../icon2.svg';

export default observer (function ModalContainer() {
	const {modalStore} = useStore();
	
	return (
		<Modal show={modalStore.modal.open} onHide={modalStore.closeModal}>
			<Modal.Header 
				closeButton 
				closeVariant='white' 
				className='bg-primary'>
				<img
					src={icon2}
					width="30"
					height="30"
					alt="FitWeb"
				/>
			</Modal.Header>
				
			<Modal.Body>
				<div className='d-flex flex-column justify-content-center align-items-center'>
					{modalStore.modal.body}
				</div>
			</Modal.Body>
		</Modal>
	)
})