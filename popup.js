document.getElementById('capture-btn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: captureAndRecognizeText
    });
});

async function captureAndRecognizeText() {
    try {
        // Capture the screen
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        // Draw the video frame to a canvas
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Stop the video stream
        stream.getTracks().forEach(track => track.stop());

        // Convert canvas to an image
        const imageData = canvas.toDataURL('image/png');

        // Send the image to the server for text recognition
        const response = await fetch('http://127.0.0.1:5000/recognize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        });

        const result = await response.json();
        console.log('Recognized Text:', result.text);

        // Simulate typing the recognized text
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = result.text;
        textarea.focus();
        textarea.select();
    } catch (error) {
        console.error('Error capturing screen:', error);
    }
}