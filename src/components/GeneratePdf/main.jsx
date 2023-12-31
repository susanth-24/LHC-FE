import React, { Fragment, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MyDocument from './GeneratePdf';
import { getRequest, getRequests } from '../../actions/requests';

const PdfViewer = () => {
  const { id } = useParams();
  const request = useSelector(state => state.requests.request);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequest(id));
  }, []);

  // const filteredRequest = requests?.filter(request => request?._id === id);
  console.log(request);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);

    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, []);

  const checkWindowWidth = () => {
    const { innerWidth } = window;
    setIsSmallDevice(innerWidth < 700);
  };

  return (
    <Fragment>
      {!isSmallDevice ?
        <>
          <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <MyDocument data={request} />
          </PDFViewer>
        </>
        : <>
          <PDFDownloadLink document={<MyDocument />} fileName={`${request?._id}.pdf`}>
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        </>}

    </Fragment>
  );
};

export default PdfViewer;
