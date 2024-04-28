import React, { useState, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // import the CSS for cropperjs
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

type PreviewFile = File & { preview?: string };

export default observer( function PhotoUploadWidget() {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const cropperRef = useRef(null);
  const {profileStore} = useStore();
  const navigate = useNavigate();
  const {userStore: {user}} = useStore();

  const onDrop = (acceptedFiles: PreviewFile[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  const onSubmit = () => {
	const imageElement: any = cropperRef?.current;
	const cropper: any = imageElement?.cropper;
	cropper.getCroppedCanvas().toBlob((blob: Blob) => {
		profileStore.uploadPhoto(blob);
	  });
	navigate(`/profile/${user?.username}`);
  };

  return (
    <Container>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()} style={{border: '2px dashed #666', padding: '20px', borderRadius: '5px', textAlign: 'center', marginTop: '20px'}}>
              <input {...getInputProps()} />
              <p style={{color: '#666'}}>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <aside>
        {files && files.length > 0 &&
          <>
            <h4>Files</h4>
            <ul>
              {files.map(file => (
                <li key={file.name}>
                  <Cropper
                    ref={cropperRef}
                    src={file.preview}
                    aspectRatio={1}
                    guides={false}
                  />
                </li>
              ))}
            </ul>
            <Button onClick={onSubmit}>Submit</Button>
          </>
        }
      </aside>
    </Container>
  );
})