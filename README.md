# 🚀 Online SQL Editor - Atlan Frontend Engineering Assignment  

## 🛠️ Built Using:
- **React** with Material-UI for a sleek, responsive UI  
- **CodeMirror 6** for a powerful SQL query editor  
- **sql-formatter** for automatic SQL query formatting  

👉 **[View Demo on the Deployed Site 🚀](https://sq-liter-atlan-assignment.vercel.app/)**  
_Replace the above link with your actual deployed site URL._  

---

## 📸 Screenshot  
_Replace the placeholder below with an actual screenshot of your app._  
![image](https://github.com/user-attachments/assets/dd007d01-bf2a-4919-8942-4967bddfc187)

![image](https://github.com/user-attachments/assets/0952a3bb-c660-4490-907b-954e5d36ffe1)




---

## 👨‍💻 Features
✅ Execute predefined SQL queries using the CodeMirror editor or the sidebar menu.  
✅ Sort query results by clicking on table headers in the results table.  
✅ Filter data in the results table using the filter bar.  
✅ Export query results as a CSV file with a single click.  
✅ SQL queries are automatically formatted for better readability in the editor.  
✅ Query history is saved and accessible via the sidebar (up to 5 recent queries).  
✅ Responsive design with a single dark theme (`#222831`, `#31363F`, `#76ABAE`, `#EEEEEE`) for a consistent user experience.  

---

## ✍️ Predefined SQL Queries
The app includes sample queries based on the **Northwind** database schema (from SQL Tutorial):

```sql
-- Fetch top 5 products
SELECT product_id, product_name, unit_price FROM products LIMIT 5;

-- Fetch top 5 customer orders
SELECT order_id, customer_id, order_date FROM orders LIMIT 5;

-- Get top 5 selling products
SELECT p.product_name, SUM(od.quantity) AS total_quantity
FROM products p
JOIN order_details od ON p.product_id = od.product_id
GROUP BY p.product_name
ORDER BY total_quantity DESC
LIMIT 5;

-- Get monthly revenue
SELECT DATE_TRUNC('month', order_date) AS month, SUM(od.quantity * od.unit_price) AS revenue
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month
LIMIT 5;

-- Get inactive customers
SELECT customer_id, company_name
FROM customers
WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders)
LIMIT 5;
```

---

## ⚙️ NPM Modules Used
- **`react`**: ^18.2.0 - Core library for building the UI.  
- **`react-dom`**: ^18.2.0 - To interact with React's virtual DOM.  
- **`@mui/material`**: ^5.x.x - For Material-UI components and styling.  
- **`@uiw/react-codemirror`**: ^4.x.x - For the CodeMirror 6 editor with SQL syntax highlighting.  
- **`@codemirror/lang-sql`**: ^6.x.x - SQL language support for CodeMirror.  
- **`@codemirror/autocomplete`**: ^6.x.x - Autocompletion support in CodeMirror.  
- **`@codemirror/theme-one-dark`**: ^6.x.x - Dark theme for CodeMirror.  
- **`react-router-dom`**: ^6.3.0 - For routing and navigation.  

---

## ⏱️ Page Load Time
![image](https://github.com/user-attachments/assets/6ff64ff4-1b00-486a-8ff5-d89dbb2bcb37)


 

---

## 🪜 Steps Taken to Optimize Page Load Time
✅ **Memoization with `useMemo`:** Memoized the `formattedData` and `filteredAndSortedData` computations in `ResultsTable.js` to reduce unnecessary re-renders.  
✅ **Efficient State Updates:** Limited the `queryHistory` state in `SqlEditor.js` to the last 5 entries to prevent memory bloat.  
✅ **Production Build Optimizations:** Leveraged Create React App’s production build features, including minification, tree-shaking, and code splitting.  
✅ **Lightweight Dependencies:** Used lightweight libraries like `sql-formatter` to format SQL queries efficiently.  
✅ **CodeMirror Optimization:** Applied query formatting only when the query prop changes (via `useEffect` in `QueryEditor.js`), preventing unnecessary formatting.  
✅ **Suggested Deployment on Netlify:** Leveraged Netlify's CDN for reduced latency and improved load times globally.  

---

## 🚀 Available Scripts
In the project directory, you can run:

### 🔥 `yarn start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  

### 📦 `yarn build`
Builds the app for production to the `build` folder.  
The build is minified, and the filenames include hashes.  
Your app is ready to be deployed!

---

## 📝 License
This project is licensed under the MIT License.  

---

💡 **Feel free to fork and customize this project!** 😊  
---

Let me know if this looks good or if you'd like to modify anything! 🚀
