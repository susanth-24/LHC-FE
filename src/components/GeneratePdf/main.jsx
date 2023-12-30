import React, { Fragment, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
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

  return (
    <Fragment>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <MyDocument data={request} />
      </PDFViewer>
    </Fragment>
  );
};

export default PdfViewer;
