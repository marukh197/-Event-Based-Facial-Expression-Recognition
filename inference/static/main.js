const uploader = document.getElementById('videoUploader');
const video    = document.getElementById('video');
const canvas   = document.getElementById('canvas');
const predictB = document.getElementById('predictBtn');
const resultD  = document.getElementById('result');
let currentFrameDataURL = null;

// load selected video into <video>
uploader.onchange = () => {
  const file = uploader.files[0];
  if (!file) return;
  video.src = URL.createObjectURL(file);
  predictB.disabled = true;
  resultD.innerHTML = '';
};

// pause & grab frame on click
video.addEventListener('click', () => {
  video.pause();
  const w = video.videoWidth, h = video.videoHeight;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, w, h);
  currentFrameDataURL = canvas.toDataURL('image/png');
  predictB.disabled = false;
});

// send to server for prediction
predictB.onclick = async () => {
  if (!currentFrameDataURL) return;
  resultD.textContent = 'Predicting…';
  const resp = await fetch('/predict', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ image: currentFrameDataURL })
  });
  const j = await resp.json();
  if (resp.ok) {
    resultD.innerHTML = 
      `🎭 Predicted: <strong>${j.emotion}</strong> ` +
      `(conf ${j.confidence})<br>` +
      `Scores: ${Object.entries(j.all).map(([k,v])=>`${k}:${v}`).join(' | ')}`;
  } else {
    resultD.textContent = "Error: " + (j.error||resp.statusText);
  }
};
