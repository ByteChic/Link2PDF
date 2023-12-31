document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("convertBtn").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      openConvertApiPage(currentUrl);
    });
  });
});

function openConvertApiPage(url) {
  const convertApiUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
    getConvertApiHtml(url)
  )}`;
  chrome.tabs.create({ url: convertApiUrl });
}

function getConvertApiHtml(url) {
  const apiSecret = "kBnLlBbpHinpRhuT"; // Replace with your actual ConvertAPI secret
  return `<!DOCTYPE html>
    <html>
        <head>
            <title>Convert API snippet</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                }
  
                form {
                    display: flex;
                    flex-direction: column;
                }
  
                label {
                    margin-bottom: 8px;
                }
  
                input[type="url"] {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 12px;
                }
  
                input[type="submit"] {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    cursor: pointer;
                }
  
                input[type="submit"]:hover {
                    background-color: #45a049;
                }
  
                .error {
                    color: #ff0000;
                    margin-top: 8px;
                }
            </style>
        </head>
        <body>
            <form action="https://v2.convertapi.com/convert/html/to/pdf?Secret=${apiSecret}&download=attachment" method="post" enctype="multipart/form-data">
                <label for="url">URL:</label>
                <input type="url" name="File" id="url" value="${url}" style="width: 100%;" required />
                <div class="error" id="urlError"></div>
                <br/>
                <input type="submit" value="Convert to PDF" onclick="return validateForm();" />
            </form>
  
            <script>
                function validateForm() {
                    const urlInput = document.getElementById('url');
                    const urlError = document.getElementById('urlError');
  
                    // Validate URL
                    if (!isValidUrl(urlInput.value)) {
                        urlError.textContent = 'Invalid URL';
                        return false;
                    } else {
                        urlError.textContent = '';
                    }
  
                    return true;
                }
  
                function isValidUrl(url) {
                    try {
                        new URL(url);
                        return true;
                    } catch (error) {
                        return false;
                    }
                }
            </script>
        </body>
    </html>`;
}
