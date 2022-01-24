import React, { lazy, Suspense } from 'react';

const LazyComponent/vaccinationDrive = lazy(() => import('./Component/vaccinationDrive'));

const Component/vaccinationDrive = props => (
  <Suspense fallback={null}>
    <LazyComponent/vaccinationDrive {...props} />
  </Suspense>
);

export default Component/vaccinationDrive;
