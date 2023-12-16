import {
  getCLS,
  getFID,
  getLCP,
  getTTFB,
  ReportHandler,
} from 'web-vitals/base';

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
