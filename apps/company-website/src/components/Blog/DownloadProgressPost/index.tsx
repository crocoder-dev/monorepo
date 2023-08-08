import React from 'react';
import styles from './index.module.scss';

const fetchFile = async (callback) => {
  const startTime = performance.now();
  const res = await fetch('/file').then(res => getProgress(res, callback));
  const blob = await res.blob();
  console.log(blob.size);
  const endTime = performance.now();
  console.log(`Total time: ${endTime - startTime} ms`);
}

async function getProgress(res, callback) {
  const { body, headers } = res.clone();
  let recieved = 0;

  const reader = body.getReader();

  const contentLength = parseInt(headers.get('Content-Length') || 0);

  while (true) {
    const startTime = performance.now()
    const { done, value } = await reader.read();
    const endTime = performance.now()
    recieved += value?.length || 0;
    callback({ recieved, contentLength, startTime, endTime });
    if (done) {
      return res;
    }
  }

}

let array = [];

function log ({ recieved, contentLength, startTime, endTime }) {
  const duration = endTime - startTime; // ms
  const speed = recieved / duration; // bytes/ms
  const remaining = contentLength - recieved; // bytes
  const remainingTime = remaining / speed; // ms
  console.log(`Recieved: ${recieved} bytes`);
  console.log(`Content-Length: ${contentLength} bytes`);
  console.log(`Duration: ${duration} ms`);
  console.log(`Speed: ${speed} bytes/ms`);
  console.log(`Remaining: ${remaining} bytes`);
  console.log(`Remaining time: ${remainingTime} ms`);
}

const DownloadProgressDemo = () => {



  return (
    <>
      <label htmlFor="file">File progress:</label>
      <progress id="file" max="100" value="0">0%</progress>
      <button onClick={() => { fetchFile(log) }}>Download</button>
    </>
  );
};

export default DownloadProgressDemo;
