import React, { useMemo } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

type Params = {
  onDrop: (files: File[]) => void;
  accept?: Accept;
  text?: React.ReactNode;
};

export function StyledDropzone({ onDrop, accept, text = "Drag 'n' drop some files here, or click to select files" }: Params) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ onDrop, accept });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className='container'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    </div>
  );
}

//
// Styles
//

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
const focusedStyle = {
  borderColor: '#2196f3'
};
const acceptStyle = {
  borderColor: '#00e676'
};
const rejectStyle = {
  borderColor: '#ff1744'
};
