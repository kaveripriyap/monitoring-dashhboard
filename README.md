# Intellimonitor

Intellimonitor is an application for monitoring and maintaining WM applications. This application is divided into two distinct perspectives: the **Tech View** and the **Management View**.

## Tech View

The **Tech View** caters to technical support analysts, offering them insights on the status of applications to effectively handle morning checks or production incidents. This section comprises two primary views: the **Panel View** and the **List View**.

### Panel View

The **Panel View** employs a card-based layout to succinctly depict AS (Application Server) status for each individual application. Each card encapsulates essential information about application health, providing immediate visibility into any anomalies that warrant attention.

### List View

The **List View** compiles a comprehensive catalog of nodes and servers affiliated with WM applications. It provides breakdown of component statuses, allowing analysts to swiftly identify and rectify specific issues. 

## Management View

The **Management View** offers a top-level perspective, catering to management personnel seeking high-level insights. It displays a bird's-eye view of application cluster statuses, facilitating rapid assessments of overall cluster system health.

---

## Prerequisites

Before you begin, ensure that you meet the following prerequisites:

- Node.js version 18.12.0 or higher
- npm version 8.19.2 or higher

---

## Installation

Follow these steps to get the WM Monitoring Application up and running:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
   
2. Navigate to the project directory.

   ```bash
   cd your-repository
   ```

3. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

4. Start the frontend of the application using:

   ```bash
   npm start
   ```

This will initiate the application and make it accessible via your web browser. Open a web browser and navigate to http://localhost:3000 to view the WM Monitoring Application.

---

## Folder Structure

The repository is organized with the following folder structure:

```
WM Monitoring Application
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── index.tsx
│   ├── routes.tsx
│   ├── assets
│   ├── components
│   │   ├── card
│   │   ├── dataDisplay
│   │   ├── icons
│   │   ├── menu
│   │   ├── navbar
│   │   ├── scrollbar
│   │   ├── separator
│   │   └── sidebar
│   ├── contexts
│   ├── layouts
│   ├── theme
│   ├── types
│   └── views
│       ├── dashboards
│       │   ├── dashboard
│       │   │   └── index.tsx
│       ├── tech
│       │   ├── listView
│       │   │   ├── components
│       │   │   │   ├── ApplicationsTable.tsx
│       │   │   │   └── Banner.tsx
│       │   │   └── index.tsx
│       │   ├── panelView
│       │   │   ├── components
│       │   │   │   ├── ApplicationCard.tsx
│       │   │   │   ├── Banner.tsx
│       │   │   │   ├── ClusterCard.tsx
│       │   │   │   ├── PopupCard.tsx
│       │   │   │   ├── ServerCard.tsx
│       │   │   │   ├── ServerCardList.tsx
│       │   │   │   ├── SnoozedNodesPopup.tsx
│       │   │   │   └── Search.tsx
│       │   │   ├── variables
│       │   │   │   ├── tableAppList.ts
│       │   │   │   └── tableServerNodeList.ts
│       │   │   └── index.tsx
```


The project structure is divided into several key directories, each serving a specific purpose. Here's a breakdown of the main folders:

- **`public`**: Contains static files that are publicly accessible, such as the main HTML file, icons, and manifest files.

- **`src`**: Holds the source code for the application.
  - `index.tsx`: The entry point for the application.
  - `routes.tsx`: Defines the application's routing logic.

- **`src/assets`**: Houses various assets used in the application.

- **`src/components`**: Contains reusable components divided into subdirectories based on their functionality:
  - `card`
  - `dataDisplay`
  - `icons`
  - `menu`
  - `navbar`
  - `scrollbar`
  - `separator`
  - `sidebar`

- **`src/contexts`**: Provides context providers for sharing state throughout the app.

- **`src/layouts`**: Holds layout-related components for structuring the app's visual layout.

- **`src/theme`**: Contains styling themes and related configurations.

- **`src/types`**: Contains type definitions and TypeScript-related configurations.

- **`src/views/dashboards`**: Holds dashboard-related components.

- **`src/views/tech/listView`**: Contains components for the list view in the technical section.
  - `components`: Houses reusable components specific to the list view, such as the `ApplicationsTable` and `Banner`.

- **`src/views/tech/panelView`**: Contains components for the panel view in the technical section.
  - `components`: Contains various components like `ApplicationCard`, `Banner`, `ClusterCard`, `PopupCard`, `ServerCard`, `ServerCardList`, `SnoozedNodesPopup`, and `Search`.
  - `variables`: Stores variables related to the panel view.

Keeping to this organization of structure helps maintain a clear separation of concerns and enables efficient development and maintenance of the application.

---

## Components

In the panel view of the WM Monitoring Application, various components come together to represent the hierarchy of nodes, servers, applications, and clusters. Here's an overview of the important components and their relationships:

### Node and Server Card

At the base of the hierarchy, the server or node card represents individual nodes and servers. These cards are based on the `NodeObj` type, which includes information such as name, type, AS code, error, time, status, and link.

```tsx
type NodeObj = {
  name: string;
  type: 'MC' | 'AppD' | 'GUI';
  asCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
};
```

### Application Card

NodeObj objects are mapped together into applications based on their AS codes. Each application card has derived statuses for MC, AppD, and GUI types, which are determined from the nodes/servers under them with corresponding types.

```tsx
type AppObj = {
  name: string;
  asCode: string;
  overallStatus: string;
  mcStatus: string;
  appdStatus: string;
  guiStatus: string;
  cluster: string;
};
```
The overall status of each application card is derived from the statuses of its MC, AppD, and GUI types, which are in turn derived from the nodes/servers under them with matching types.

### Cluster Card

At the top of the hierarchy, the cluster card displays the status of applications clustered under it. This clustering is based on data from `tableAppList`, which contains static application data. Applications are mapped together based on their clusters.

This hierarchy allows you to visualize the status of nodes, servers, applications, and clusters, providing a comprehensive monitoring experience for both technical and management views.

## APIs and Services

To interact with backend APIs and services in the WM Monitoring Application, follow the example below. This provides a general guideline for making API requests, handling responses, and managing errors.

### Example API Request

Below is an example of fetching data from a backend API endpoint using the `fetchTableNodeList` function:

```tsx
import React, { useEffect, useState } from 'react';

const MyComponent: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-backend-api-url');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render your component with fetched data */}
    </div>
  );
};

export default MyComponent;
```

## Making API Requests

To interact with backend APIs and services in the WM Monitoring Application, follow these steps to make API requests, handle responses, and manage errors.

### Import Dependencies

Import the necessary dependencies in your component. For example, you might need `React`, `useEffect`, and `useState`:

```tsx
import React, { useEffect, useState } from 'react';
```

### Define State

Create state variables to store the fetched data and manage the component's state:

```tsx
const [tableData, setTableData] = useState<any[]>([]);
```

### Use useEffect

Utilize the useEffect hook to initiate the API request within your component. This ensures that the API request is made when the component mounts:

```tsx
useEffect(() => {
  // Fetch data here
}, []);
```

### Fetch Data

Inside the useEffect callback, create an async function to handle the API request using the fetch function. Use await response.json() to parse JSON data:

```tsx
const fetchData = async () => {
  try {
    const response = await fetch('your-backend-api-url');
    const data = await response.json();
    setTableData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error as needed
  }
};

useEffect(() => {
  fetchData();
}, []);
```

### Handle Errors

Wrap the fetch call in a try and catch block to catch errors during the fetch process. Implement error handling according to your app's requirements:

```tsx
try {
  // Fetch data
} catch (error) {
  console.error('Error fetching data:', error);
  // Handle the error as needed
}
```

### Rendering Data

After fetching data, use the retrieved information to render components or update your application's state. In this example, tableData is set using setTableData for rendering within your component.

---

## Features Implemented

The WM Monitoring Application comes equipped with several features to enhance your monitoring experience:

- Cluster-wise eagle view: Gain an overview of the status of application clusters from a high-level perspective.
- Application level panel view: Dive into detailed application-level status using the panel view.
- Searching and sorting functionality: Easily locate and organize data through search and sorting options.
- Filter functionality (by RAG, by cluster): Filter data by color-coding (Red, Amber, Green) or specific clusters.
- Management and tech views: Separate views tailored for management and technical support analysts.
- Snooze node functionality: Temporarily disable notifications for specific nodes.
- Snoozed nodes view: Access a dedicated view to track snoozed nodes.
- Server/Nodes List View: Utilize the list view to display servers and nodes with relevant details.
- Hosted on UNIX box: Deployed on a UNIX-based server for stability and performance.

---

## Features to be Implemented

As the WM Monitoring Application evolves, we plan to introduce the following enhancements and additions:

- Modify cards to accommodate displaying more data sources.
- Implement end snooze functionality and create an approval process for admin-initiated snooze requests.
- Provide an interactive interface to add, update, and delete applications. Frontend will communicate with the backend through POST requests to update the database.
- Transform the application into a go-to IntelliMonitor website, ensuring seamless navigation and intuitive interactions.
- Enhance the List View feature to offer more advanced functionalities and customization options.
- Add testing frameworks, such as Jest, to ensure robust testing and code quality.
- Create a CI/CD pipeline to maintain and streamline the development and deployment processes.

---

## Contributing

Contributions to the WM Monitoring Application that can help improve its functionality, usability, and overall quality are most welcome! Here are some general guidelines to consider when contributing to the project:

### General React Guidelines

1. **Follow React Best Practices:** Adhere to React best practices and coding standards to ensure consistent and maintainable code.
   
2. **Component Reusability:** Aim for reusable and modular components that can be easily integrated into different parts of the application.

3. **State Management:** Make thoughtful decisions on state management (such as using React's `useState`, `useReducer`, or context API) based on the scope and complexity of the component's state.

4. **Separation of Concerns:** Keep business logic separate from presentation components. Utilize container and presentational components when applicable.

5. **Effective Props Usage:** Pass props effectively between components, and avoid unnecessary prop drilling by utilizing context or custom hooks.

### Chakra UI and UI/UX Guidelines

1. **Leverage Chakra UI:** Maintain the aesthetics and design consistency by utilizing Chakra UI components and styling utilities for a seamless user experience.

2. **Brand Colors:** Utilize the colors from the project palette to ensure a consistent visual identity across the application.

3. **Responsive Design:** Implement responsive designs that adapt well to different screen sizes and devices. Chakra UI provides responsive styling out of the box.

4. **Accessibility:** Prioritize accessibility by using semantic HTML elements, providing alt text for images, and ensuring that interactive elements are keyboard-navigable.

5. **Consistent Layout:** Keep the layout and spacing consistent throughout the application. Chakra UI's grid and spacing system can help maintain uniformity.

### Submitting Contributions

1. **Fork and Branch:** Fork the repository, create a new branch for your contribution, and commit your changes to that branch.

2. **Clear Commit Messages:** Write clear and concise commit messages that describe the purpose of your changes.

3. **Pull Request:** Submit a pull request with a detailed description of your changes, explaining the problem you solved and the approach you took.

4. **Testing:** If applicable, include tests for your contributions to maintain code quality.
