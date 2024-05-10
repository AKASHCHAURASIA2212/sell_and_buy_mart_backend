const weeklyTemp = () => {
  return `<!DOCTYPE html>< html lang = "en" > <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Weekly Product Update</title>
            <style>
              body {
                font - family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
      }

              .container {
                max - width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

              h1 {
                color: #333;
      }

              p {
                color: #666;
              line-height: 1.6;
      }

              .product-item {
                margin - bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #ccc;
      }

              .product-name {
                font - weight: bold;
      }

              .button {
                display: inline-block;
              padding: 10px 20px;
              background-color: #4285f4;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
      }
            </style>
          </head>

          <body>
            <div class="container">
              <h1>Weekly Product Update</h1>
              <div class="product-item">
                <p class="product-name">Product A</p>
                <p>New features added: Feature 1, Feature 2</p>
              </div>
              <div class="product-item">
                <p class="product-name">Product B</p>
                <p>Improvements made: Improvement 1, Improvement 2</p>
              </div>
              <div class="product-item">
                <p class="product-name">Product C</p>
                <p>Bug fixes: Bug 1, Bug 2</p>
              </div>
              <p>Stay tuned for more updates next week!</p>
              <a href="#" class="button">View Details</a>
            </div>
          </body>

        </html>`
}
export default weeklyTemp