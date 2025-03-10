/* General Styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

header {
  background: #4caf50;
  color: white;
  text-align: center;
  padding: 10px 0;
}

header h1 {
  margin: 0;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

main {
  padding: 20px;
}

form {
  margin-bottom: 20px;
}

input[type="text"], input[type="password"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(100% - 22px);
}

.hidden {
  display: none;
}

/* Order Details Section */
#orderDetails {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Login Section */
#loginSection {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Admin Panel */
#adminPanel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
}

td {
  background-color: #f9f9f9;
}

td.editable {
  background-color: #e7f3ff;
  cursor: text;
}

td.editable:focus {
  outline: none;
  border: 2px solid #4caf50;
  background-color: #d9f7d9;
}

/* Links */
a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Buttons in Table Rows */
table td button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

table td button:hover {
  background-color: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }

  header h1 {
    font-size: 20px;
  }

  button {
    font-size: 14px;
    padding: 8px 12px;
  }

  input[type="text"], input[type="password"] {
    font-size: 14px;
  }

  th, td {
    padding: 8px;
  }
}
/* Add this to your style.css */
.hidden {
  display: none;
}

/* Add these styles to your existing CSS */

/* Create Order Form */
#createOrderForm {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#createOrderForm label {
  display: block;
  margin-bottom: 5px;
}

#createOrderForm input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Filter and Sort Controls */
#filterSortControls {
  margin-bottom: 20px;
}

#filterSortControls label {
  margin-right: 10px;
}

#filterSortControls select, #filterSortControls button {
  padding: 8px 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

/* Delete Button */
.deleteOrder {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

/* Double Ring Spinner */
@keyframes ldio-wd0tfznac7 {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}

.ldio-wd0tfznac7 div { box-sizing: border-box!important; }

.ldio-wd0tfznac7 > div {
  position: absolute;
  width: 146.25px;
  height: 146.25px;
  top: 24.375px;
  left: 24.375px;
  border-radius: 50%;
  border: 17.55px solid #000;
  border-color: #037ef3 transparent #037ef3 transparent;
  animation: ldio-wd0tfznac7 1.7241379310344827s linear infinite;
}

.ldio-wd0tfznac7 > div:nth-child(2),
.ldio-wd0tfznac7 > div:nth-child(4) {
  width: 107.25px;
  height: 107.25px;
  top: 43.875px;
  left: 43.875px;
  animation: ldio-wd0tfznac7 1.7241379310344827s linear infinite reverse;
}

.ldio-wd0tfznac7 > div:nth-child(2) {
  border-color: transparent #f85a40 transparent #f85a40;
}

.ldio-wd0tfznac7 > div:nth-child(3) { border-color: transparent; }

.ldio-wd0tfznac7 > div:nth-child(3) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.ldio-wd0tfznac7 > div:nth-child(3) div:before,
.ldio-wd0tfznac7 > div:nth-child(3) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 17.55px;
  height: 17.55px;
  top: -17.55px;
  left: 46.8px;
  background: #037ef3;
  border-radius: 50%;
  box-shadow: 0 128.7px 0 0 #037ef3;
}

.ldio-wd0tfznac7 > div:nth-child(3) div:after {
  left: -17.55px;
  top: 46.8px;
  box-shadow: 128.7px 0 0 0 #037ef3;
}

.ldio-wd0tfznac7 > div:nth-child(4) { border-color: transparent; }

.ldio-wd0tfznac7 > div:nth-child(4) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.ldio-wd0tfznac7 > div:nth-child(4) div:before,
.ldio-wd0tfznac7 > div:nth-child(4) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 17.55px;
  height: 17.55px;
  top: -17.55px;
  left: 27.3px;
  background: #f85a40;
  border-radius: 50%;
  box-shadow: 0 89.7px 0 0 #f85a40;
}

.ldio-wd0tfznac7 > div:nth-child(4) div:after {
  left: -17.55px;
  top: 27.3px;
  box-shadow: 89.7px 0 0 0 #f85a40;
}

.loadingio-spinner-double-ring-oot7eymf2wg {
  width: 195px;
  height: 195px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}

.ldio-wd0tfznac7 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ldio-wd0tfznac7 div { box-sizing: content-box; }

/* Hide the spinner by default */
.hidden {
  display: none;
}
.deleteOrder:hover {
  background-color: #ff1a1a;
}
