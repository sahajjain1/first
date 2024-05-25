import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import resumePdf from '../resume.pdf';

const FilePreview = () => {
  const docs = [{ uri: resumePdf }]; 

  return (
    <div>
      <h2>File Preview</h2>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        style={{ height: '500px' }}
      />
    </div>
  );
};

export default FilePreview;