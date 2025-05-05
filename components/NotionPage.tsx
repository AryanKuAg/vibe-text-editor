'use client';

import { FC } from 'react';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import { getPageTitle } from 'notion-utils';

// Import required styles
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // For code highlighting
import 'katex/dist/katex.min.css'; // For math equations

// Import optional components
import dynamic from 'next/dynamic';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection)
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  { ssr: false }
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false }
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
}

const NotionPage: FC<NotionPageProps> = ({ recordMap, rootPageId }) => {
  if (!recordMap) {
    return <div className="p-8">Loading...</div>;
  }

  const title = getPageTitle(recordMap);

  return (
    <div className="notion-root">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf
        }}
        mapPageUrl={(pageId) => `/notion-blogs/${pageId}`}
        forceCustomImages
        pageTitle={title}
        previewImages={true}
        showCollectionViewDropdown={true}
        minTableOfContentsItems={0}
        defaultPageIcon={null}
        defaultPageCover={null}
        defaultPageCoverPosition={0}
      />
    </div>
  );
};

export default NotionPage;
