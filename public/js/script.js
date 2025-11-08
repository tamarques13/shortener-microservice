const form = document.getElementById('postUrlContainer');
const urlInput = document.getElementById('url_input');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    const origin = window.location.origin;

    if (!url) return alert('Please enter a URL');

    try {
        const res = await fetch('/api/shorturl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await res.json();

        resultDiv.style.display = 'block';

        if (data.error) {
            resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
            return;
        }

        resultDiv.innerHTML = `
            <p><strong>Original URL:</strong> <a href="${data.original_url}" target="_blank">${data.original_url}</a></p>
            <p><strong>Shortened URL:</strong> <a href="${origin}/api/shorturl/${data.short_url}" target="_blank">${origin}/api/shorturl/${data.short_url}</a></p>
        `;
    } catch (err) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p class="error">Error shortening URL.</p>`;
        console.error(err);
    }
});