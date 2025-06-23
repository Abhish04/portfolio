document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    contactForm.parentNode.appendChild(successMessage);

    // Add word count display 
    const messageTextarea = document.getElementById('message');
    const wordCountDisplay = document.createElement('div');
    wordCountDisplay.className = 'word-count';
    wordCountDisplay.textContent = 'Words: 0/500';
    messageTextarea.parentNode.insertBefore(wordCountDisplay, messageTextarea.nextSibling);

    // Update word count in real-time 
    messageTextarea.addEventListener('input', function() {
        const words = this.value.trim().split(/\s+/);
        const wordCount = this.value.trim() === '' ? 0 : words.length;
        wordCountDisplay.textContent = `Words: ${wordCount}/500`;
        
        if (wordCount > 500) {
            wordCountDisplay.style.color = '#ff6b6b';
        } else if (wordCount < 10) {
            wordCountDisplay.style.color = '#ffc107';
        } else {
            wordCountDisplay.style.color = '#00ff99';
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const words = message.split(/\s+/);
        const wordCount = message === '' ? 0 : words.length;
        
        // Validation checks 
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (wordCount < 10) {  
            alert('Message must be at least 10 words');
            return;
        }
        
        if (wordCount > 500) {  
            alert('Message cannot exceed 500 words');
            return;
        }
        
        fetch('https://formsubmit.co/ajax/abhi.avi852@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            successMessage.style.display = 'block';
            contactForm.reset();
            wordCountDisplay.textContent = 'Words: 0/500';  
            wordCountDisplay.style.color = '#00ff99';  
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    });
});
