
// Require Packages
require('dotenv').config({ path: './config.env'});
const express = require('express');
const cors = require('cors');

// Basic express setup.
const port = 3000;
const app = express();
const storeName = 'shineearly';

/// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Display basic order objects on the orders page.
app.get("/orders", cors(), async(req, res) => {
    const resource = 'orders';
    const query = `fields=id,name,customer&limit=1`;
    let response = await fetch(`https://${storeName}.myshopify.com/admin/api/2023-10/${resource}.json?${query}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN,
        }
    });

    response = await response.json();

    res.send(response);
});

// Display basic order objects on the orders page.
app.get("/orders-all-data", cors(), async(req, res) => {
    const resource = 'orders';
    const query = `limit=1`;
    let response = await fetch(`https://${storeName}.myshopify.com/admin/api/2023-10/${resource}.json?${query}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN,
        }
    });

    response = await response.json();

    res.send(response);
});

app.listen(port, () => console.log(`App is running on port: ${port}`))