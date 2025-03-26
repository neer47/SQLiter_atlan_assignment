const mockData = [
    {
      title: "All Products",
      query: "SELECT product_id, product_name, unit_price FROM products LIMIT 15;",
      result: [
        { product_id: 1, product_name: "Chai", unit_price: 18.0 },
        { product_id: 2, product_name: "Chang", unit_price: 19.0 },
        { product_id: 3, product_name: "Aniseed Syrup", unit_price: 10.0 },
        { product_id: 4, product_name: "Chef Anton's Cajun Seasoning", unit_price: 22.0 },
        { product_id: 5, product_name: "Chef Anton's Gumbo Mix", unit_price: 21.35 },
        { product_id: 6, product_name: "Grandma's Boysenberry Spread", unit_price: 25.0 },
        { product_id: 7, product_name: "Uncle Bob's Organic Dried Pears", unit_price: 30.0 },
        { product_id: 8, product_name: "Northwoods Cranberry Sauce", unit_price: 40.0 },
        { product_id: 9, product_name: "Mishi Kobe Niku", unit_price: 97.0 },
        { product_id: 10, product_name: "Ikura", unit_price: 31.0 },
        { product_id: 11, product_name: "Queso Cabrales", unit_price: 21.0 },
        { product_id: 12, product_name: "Gnocchi di nonna Alice", unit_price: 38.0 },
        { product_id: 13, product_name: "Ravioli Angelo", unit_price: 19.5 },
        { product_id: 14, product_name: "Alice Mutton", unit_price: 39.0 },
        { product_id: 15, product_name: "Camembert Pierrot", unit_price: 34.0 }
      ]
    },
    {
      title: "Customer Orders",
      query: "SELECT order_id, customer_id, order_date FROM orders LIMIT 15;",
      result: [
        { order_id: 10248, customer_id: "VINET", order_date: "1996-07-04" },
        { order_id: 10249, customer_id: "TOMSP", order_date: "1996-07-05" },
        { order_id: 10250, customer_id: "HANAR", order_date: "1996-07-08" },
        { order_id: 10251, customer_id: "VICTE", order_date: "1996-07-08" },
        { order_id: 10252, customer_id: "SUPRD", order_date: "1996-07-09" },
        { order_id: 10253, customer_id: "HANAR", order_date: "1996-07-10" },
        { order_id: 10254, customer_id: "CHOPS", order_date: "1996-07-11" },
        { order_id: 10255, customer_id: "RICSU", order_date: "1996-07-12" },
        { order_id: 10256, customer_id: "WELLI", order_date: "1996-07-15" },
        { order_id: 10257, customer_id: "HILAA", order_date: "1996-07-16" },
        { order_id: 10258, customer_id: "ERNSH", order_date: "1996-07-17" },
        { order_id: 10259, customer_id: "CENTC", order_date: "1996-07-18" },
        { order_id: 10260, customer_id: "OTTIK", order_date: "1996-07-19" },
        { order_id: 10261, customer_id: "QUEDE", order_date: "1996-07-22" },
        { order_id: 10262, customer_id: "RATTC", order_date: "1996-07-23" }
      ]
    },
    {
      title: "Top Selling Products",
      query: "SELECT p.product_name, SUM(od.quantity) as total_quantity FROM products p JOIN order_details od ON p.product_id = od.product_id GROUP BY p.product_name ORDER BY total_quantity DESC LIMIT 15;",
      result: [
        { product_name: "Gorgonzola Telino", total_quantity: 120 },
        { product_name: "Raclette Courdavault", total_quantity: 115 },
        { product_name: "Camembert Pierrot", total_quantity: 110 },
        { product_name: "Pavlova", total_quantity: 100 },
        { product_name: "Alice Mutton", total_quantity: 95 },
        { product_name: "Chai", total_quantity: 90 },
        { product_name: "Chang", total_quantity: 85 },
        { product_name: "Uncle Bob's Organic Dried Pears", total_quantity: 80 },
        { product_name: "Ikura", total_quantity: 75 },
        { product_name: "Chef Anton's Cajun Seasoning", total_quantity: 72 },
        { product_name: "Northwoods Cranberry Sauce", total_quantity: 68 },
        { product_name: "Mishi Kobe Niku", total_quantity: 65 },
        { product_name: "Queso Cabrales", total_quantity: 62 },
        { product_name: "Gnocchi di nonna Alice", total_quantity: 60 },
        { product_name: "Ravioli Angelo", total_quantity: 58 }
      ]
    },
    {
      title: "Revenue by Month",
      query: "SELECT DATE_TRUNC('month', order_date) as month, SUM(od.quantity * od.unit_price) as revenue FROM orders o JOIN order_details od ON o.order_id = od.order_id GROUP BY DATE_TRUNC('month', order_date) ORDER BY month LIMIT 15;",
      result: [
        { month: "1996-07-01", revenue: 12345.5 },
        { month: "1996-08-01", revenue: 15432.75 },
        { month: "1996-09-01", revenue: 13245.2 },
        { month: "1996-10-01", revenue: 16789.9 },
        { month: "1996-11-01", revenue: 14321.3 },
        { month: "1996-12-01", revenue: 17890.4 },
        { month: "1997-01-01", revenue: 15678.5 },
        { month: "1997-02-01", revenue: 19876.7 },
        { month: "1997-03-01", revenue: 16745.2 },
        { month: "1997-04-01", revenue: 13543.0 },
        { month: "1997-05-01", revenue: 14532.8 },
        { month: "1997-06-01", revenue: 15345.6 },
        { month: "1997-07-01", revenue: 16890.1 },
        { month: "1997-08-01", revenue: 17234.9 },
        { month: "1997-09-01", revenue: 19876.3 }
      ]
    },
    {
      title: "Inactive Customers",
      query: "SELECT customer_id, company_name FROM customers WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders) LIMIT 15;",
      result: [
        { customer_id: "PARIS", company_name: "Paris Specialty" },
        { customer_id: "LONDO", company_name: "London Goods" },
        { customer_id: "NYCUS", company_name: "NYC Supplies" },
        { customer_id: "TOKIO", company_name: "Tokyo Traders" },
        { customer_id: "SYDNE", company_name: "Sydney Imports" },
        { customer_id: "AMSTR", company_name: "Amsterdam Exports" },
        { customer_id: "ROMA", company_name: "Rome Enterprises" },
        { customer_id: "BERLI", company_name: "Berlin Goods" },
        { customer_id: "MOSCO", company_name: "Moscow Traders" },
        { customer_id: "BOMBA", company_name: "Mumbai Supplies" },
        { customer_id: "DELHI", company_name: "Delhi Goods" },
        { customer_id: "MEXIC", company_name: "Mexico City Traders" },
        { customer_id: "SAOPA", company_name: "Sao Paulo Goods" },
        { customer_id: "BEIJN", company_name: "Beijing Exports" },
        { customer_id: "SHANG", company_name: "Shanghai Supplies" }
      ]
    }
  ];
  
  export default mockData;
  