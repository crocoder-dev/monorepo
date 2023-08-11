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


const DownloadProgressDemo = () => {

  const [duration, setDuration] = React.useState(0);
  const [recieved, setRecieved] = React.useState(0);
  const [contentLength, setContentLength] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const log = React.useCallback(({ recieved, contentLength, startTime, endTime }) => {
    const duration = endTime - startTime;
    setDuration(d => d + duration);
    setRecieved(recieved);
      setContentLength(contentLength);
    setProgress(Math.floor((recieved / contentLength) * 100));
  }, []);

  const speed = duration ? recieved / duration : 0;
  const remaining = contentLength - recieved;
  const remainingTime = remaining / speed;

  const reset = () => {
    setDuration(0);
    setRecieved(0);
    setContentLength(0);
    setProgress(0);
  }

  return (
    <>
      <label htmlFor="file">File progress:</label>
      <progress id="file" max="100" value={progress}></progress>
      <p>Recieved: {recieved} bytes</p>
      <p>Content-Length: {contentLength} bytes</p>
      <p>Duration: {duration} ms</p>
      <p>Speed: {(speed * 0.008).toFixed(1)} Mb/s</p>
      <p>Remaining: {remaining} bytes</p>
      <p>Progress: {progress}%</p>
      <p>Remaining time: {Math.round(remainingTime / 1000)} s</p>
      <br />
      <button onClick={() => { reset(); fetchFile(log) }}>Download</button>
    </>
  );
};

export default DownloadProgressDemo;
