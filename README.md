# cs465-fullstack
CS-465 Full Stack Development with MEAN
---
## Project Overview
This project is a fully functional full-stack web application designed to serve both customers and administrators. It includes secure authentication for the admin login, a backend with a NoSQL database, and a frontend interface that enhances the user experience. 

---

## Architecture

### Frontend Development
For the frontend, I utilized a combination of **Express HTML**, **JavaScript**, and a **Single-Page Application (SPA)** approach. Express HTML and JavaScript were employed for serving static pages and handling client-side interactivity, making it suitable for straightforward content delivery and user engagement. On the other hand, the SPA architecture significantly improved the user experience by dynamically updating content without page reloads, allowing for faster navigation and smoother interactions.

The key difference between Express HTML with JavaScript and SPAs lies in their approach to rendering and interactivity. While Express HTML and JavaScript are ideal for static and multi-page applications, SPAs excel at creating seamless, modern web applications by reducing server requests and enhancing performance. However, SPAs require additional client-side logic, which can add complexity to the development process but ultimately results in a more dynamic user experience. 

- Express HTML and JavaScript were sed to serve static pages and client-side interactivity for straightforward content delivery and user engagement. The use of express simplified the routing and enabled the server-side rendering of HTML pages.
- The SPA architecture improves user experience by dynamically updating content without refreshing the page. This was implemented using client-side JavaScript, enabling faster navigation and smoother interactions.

- Express HTML and JavaScript are straightforward and suitable for static pages or multi-page applications, while SPAs excel in creating a seamless and modern experience with minimal page reloads.
- SPAs require more client-side logic but reduce server requests, which enhances performance for dynamic applications.

### Backend and Database
The backend uses Node.js with Express and integrates a MongoDB NoSQL database. MongoDB was chosen because of its flexibility, scalability, speed, and seamless integration.

- NoSQL databases allow storing unstructured data using JSON-like documents, which aligns perfectly with the project's dynamic data needs.
- MongoDB supports horizontal scaling, which is ideal for growing applications.
- The schema-less design reduces overhead and speeds up development, allowing me to iterate and test rapidly.
- JSON data from MongoDB integrates naturally with the JavaScript-based frontend and backend.

---

## Functionality

### JSON vs. JavaScript
JSON is a lightweight data format for exchanging information. While JSON shares a syntax similar to JavaScript objects, it is text-based and can be used across different programming languages. JSON ties the frontend and backend by:
- Allowing structured data transfer through HTTP requests and responses.
- Serving as the communication bridge between frontend components and backend APIs, ensuring seamless interaction and data consistency.

### Code Refactoring and UI Components
Throughout the project, I refactored code to improve functionality and efficiency. For instance:
- Replaced duplicate rendering logic with reusable UI components, such as navigation bars, cards, and forms.
- Modularized API calls and backend routes into separate files for maintainability.

**Benefits of Reusable Components**:
- Consistency: Standardized UI elements improve the user experience.
- Efficiency: Reduces code duplication and enhances maintainability.
- Scalability: Features can be added faster by reusing existing components.

---

## Testing

### Methods, Endpoints, and Security

Testing involved validating HTTP methods (GET, POST, PUT, DELETE) and ensuring API endpoints function as expected:
- Methods: HTTP methods like GET (retrieve data), POST (create new records), PUT (update existing records), and DELETE (remove records) were tested to ensure CRUD operations work flawlessly.
- Endpoints: Endpoints such as `/api/trips` and `/api/trips/:tripCode` were tested using tools like Postman and MongoDB Compass to verify the responses.
- Security Testing: Testing was particularly challenging due to added security layers, including:
  - Authentication: Ensured that secure login functionality prevents unauthorized access.
  - Data Validation: Tested input validation to avoid errors and malicious data submissions.
  - Error Handling: Simulated scenarios where incorrect data or unauthorized access triggers appropriate status codes and error messages.

### Challenges
Testing the backend with protected routes required using tokens for authorization (JWT). Understanding token-based authentication was crucial for ensuring secure and reliable data flow. There was a lot of struggle with getting the authentication to work especially with the PUT and POST - edit Trip and add Trip. 
The most challenging of all was following the last guide of the project (Module 7) as this was was missing important sections. It even left out the jwtinterceptor.ts section which was crucial for the application to work with the authentication. The videos was helpful but hoped that it was a bit more structured and matched with the guide. 

---

## Reflection

This course has been instrumental in helping me progress toward my professional goals as a full-stack developer. I have gained a solid understanding of:
- **Frontend and Backend Integration**: Bridging the gap between client-side and server-side development.
- **NoSQL Databases**: Leveraging MongoDB to store and retrieve data efficiently.
- **API Development**: Creating and securing RESTful APIs that support CRUD operations.
- **Security Best Practices**: Implementing secure login authentication and protecting sensitive routes.

### Skills Learned
- **JavaScript and Node.js**: Enhanced my skills in backend development and asynchronous programming.
- **MongoDB**: Developed proficiency in NoSQL database operations.
- **Testing**: Gained experience in testing APIs and debugging complex issues.
- **Code Refactoring**: Learned the importance of clean, modular, and maintainable code.

These skills make me a more marketable candidate in the software development field, equipping me to build scalable, secure, and efficient web applications. The hands-on experience of completing a full-stack project has boosted my confidence and prepared me for real-world development challenges.

---

## Project Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   cd app_admin
   ```bash
   ng serve
   ```
4. Open the application in your browser at `http://localhost:3000` and `http://localhost:4200`.

---

## Acknowledgments
- Tools Used: Node.js, Express.js, MongoDB, Postman
- Frameworks: Bootstrap for frontend design
- Special Thanks: My course instructors and peers for their support.

