document.addEventListener('DOMContentLoaded', () => {
    const localVideoStreamElement = document.getElementById('localVideoStream');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const startStreamBtn = document.getElementById('startStreamBtn');
    const stopStreamBtn = document.getElementById('stopStreamBtn');
    const toggleMicBtn = document.getElementById('toggleMicBtn');
    const toggleCamBtn = document.getElementById('toggleCamBtn');

    const chatMessages = document.getElementById('chatMessages');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');

    let localStream = null;
    let micEnabled = true;
    let camEnabled = true;

    // Function to start local video
    async function startLocalVideo() {
        try {
            if (localStream) { // If stream already exists, stop it first
                localStream.getTracks().forEach(track => track.stop());
            }
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoStreamElement.srcObject = localStream;
            videoPlaceholder.style.display = 'none'; // Hide placeholder
            localVideoStreamElement.style.display = 'block';


            // Update UI
            startStreamBtn.disabled = true;
            stopStreamBtn.disabled = false;
            toggleMicBtn.disabled = false;
            toggleCamBtn.disabled = false;
            micEnabled = true;
            camEnabled = true;
            toggleMicBtn.textContent = 'Mute Mic';
            toggleCamBtn.textContent = 'Disable Cam';

        } catch (error) {
            console.error('Error accessing media devices.', error);
            videoPlaceholder.innerHTML = `<p>Error accessing camera/microphone: ${error.name}</p><p>Please ensure permissions are granted and try again.</p>`;
            videoPlaceholder.style.display = 'flex';
            localVideoStreamElement.style.display = 'none';
            // alert('Could not access camera/microphone: ' + error.message);
        }
    }

    // Function to stop local video
    function stopLocalVideo() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
            localVideoStreamElement.srcObject = null;
            videoPlaceholder.innerHTML = '<p>Stream ended. Click "Start Stream" to begin again.</p>';
            videoPlaceholder.style.display = 'flex';
            localVideoStreamElement.style.display = 'none';


            // Update UI
            startStreamBtn.disabled = false;
            stopStreamBtn.disabled = true;
            toggleMicBtn.disabled = true;
            toggleCamBtn.disabled = true;
            toggleMicBtn.textContent = 'Mute Mic';
            toggleCamBtn.textContent = 'Disable Cam';
        }
    }

    // Event Listeners for controls
    if (startStreamBtn) {
        startStreamBtn.addEventListener('click', startLocalVideo);
    }

    if (stopStreamBtn) {
        stopStreamBtn.addEventListener('click', stopLocalVideo);
    }

    if (toggleMicBtn) {
        toggleMicBtn.addEventListener('click', () => {
            if (localStream && localStream.getAudioTracks().length > 0) {
                const audioTrack = localStream.getAudioTracks()[0];
                micEnabled = !micEnabled;
                audioTrack.enabled = micEnabled;
                toggleMicBtn.textContent = micEnabled ? 'Mute Mic' : 'Unmute Mic';
                if (micEnabled) {
                    toggleMicBtn.classList.remove('toggled-off', 'btn-danger');
                    toggleMicBtn.classList.add('btn-secondary');
                } else {
                    toggleMicBtn.classList.remove('btn-secondary');
                    toggleMicBtn.classList.add('toggled-off', 'btn-danger');
                }
            }
        });
    }

    if (toggleCamBtn) {
        toggleCamBtn.addEventListener('click', () => {
            if (localStream && localStream.getVideoTracks().length > 0) {
                const videoTrack = localStream.getVideoTracks()[0];
                camEnabled = !camEnabled;
                videoTrack.enabled = camEnabled;
                toggleCamBtn.textContent = camEnabled ? 'Disable Cam' : 'Enable Cam';
                localVideoStreamElement.style.display = camEnabled ? 'block' : 'none';

                if (camEnabled) {
                    toggleCamBtn.classList.remove('toggled-off', 'btn-danger');
                    toggleCamBtn.classList.add('btn-secondary');
                    videoPlaceholder.style.display = 'none'; // Hide placeholder if cam is re-enabled
                } else {
                    toggleCamBtn.classList.remove('btn-secondary');
                    toggleCamBtn.classList.add('toggled-off', 'btn-danger');
                    if (videoPlaceholder.style.display === 'none' || videoPlaceholder.innerHTML === '') {
                        // Show a message if placeholder is hidden or empty (i.e. stream is active or was active)
                        videoPlaceholder.innerHTML = '<p>Camera is disabled. Click "Enable Cam" to show video.</p>';
                        videoPlaceholder.style.display = 'flex';
                    }
                }
            }
        });
    }

    // Chat Simulation
    function displayChatMessage(user, message, isSelf = false) {
        const messageElement = document.createElement('div'); // Changed to div for better styling
        messageElement.classList.add('chat-message');
        if (isSelf) {
            messageElement.classList.add('self-message');
        } else {
            messageElement.classList.add('other-message');
        }

        const userStrong = document.createElement('strong');
        userStrong.textContent = user;
        messageElement.appendChild(userStrong);
        messageElement.appendChild(document.createTextNode(message)); // Text node for the message content

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    }

    if (sendChatMessageBtn && chatMessageInput) {
        sendChatMessageBtn.addEventListener('click', () => {
            const message = chatMessageInput.value.trim();
            if (message) {
                displayChatMessage('You', message, true);
                chatMessageInput.value = '';

                // Simulate a viewer reply
                setTimeout(() => {
                    displayChatMessage('Viewer123', 'Cool stream! Thanks for sharing.');
                }, Math.random() * 2000 + 1000); // Random delay
            }
        });

        chatMessageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendChatMessageBtn.click();
            }
        });
    }

    // Initial placeholder state
    if(videoPlaceholder) {
        videoPlaceholder.style.display = 'flex';
    }
    if(localVideoStreamElement){
        localVideoStreamElement.style.display = 'none';
    }

});
