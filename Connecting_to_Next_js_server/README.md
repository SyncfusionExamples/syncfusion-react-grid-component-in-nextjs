# Syncfusion React Grid with Next.js server

A lightweight, production-ready pattern for binding **Next.js** server data to a **Syncfusion React Grid**. The sample supports complete CRUD (Create, Read, Update, Delete), server-side filtering, searching, sorting, and paging using Syncfusion **DataManager**.

## Key Features

- **Syncfusion React Grid**: Built-in search, filter, sort, and paging capabilities
- **Complete CRUD Operations**: Add, edit, delete, and update records directly from the grid
- **Custom-Binding**: Full control over grid data operations (search, filter, sort, page and CRUD actions)

## Prerequisites

  - Node.js: LTS version (e.g., v20.x or later).

  - npm/yarn: For package management.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Connecting_to_Next_js_server
   ```

2. **Run the application**
   ```bash
   npm run dev
   ```

6. **Open the application**
   
   Navigate to the local URL displayed in the terminal (typically `http://localhost:3000`).

## Configuration

**Security Note**: For production environments, store sensitive credentials using:

- Environment variables

- Secure storage solutions (e.g., Azure Key Vault, AWS Secrets Manager)

## Project Layout

| File/Folder | Purpose |
|-------------|---------|
| `/app/api/health_care/route.ts` | Server-side API route handling grid data operations |
| `/data/health_care_Entities.ts` | Entity model containing the data |
| `/app/page.ts` | Contains the Grid configuration |
| `/app/patients/doctorID/page.tsx` | Dynamic route page |

## Common Tasks

### Add a Record
1. Click the **Add** button in the toolbar
2. Fill in the form fields (Doctor ID, Name, Specialty etc.)
3. Click **Update** button in the toolbar to save the record.

### Edit a Record
1. Select a row in the grid
2. Click the **Edit** button in the toolbar
3. Modify the required fields
4. Click **Update** to save changes

### Delete a Record
1. Select a row in the grid
2. Click the **Delete** button in the toolbar
3. Confirm the deletion

### Search Records
1. Use the **Search** box in the toolbar
2. Enter keywords to filter records (searches across all columns)

### Filter Records
1. Click the filter icon in any column header
2. Select filter criteria (equals, contains, greater than, etc.)
3. Click **Filter** to apply

### Sort Records
1. Click the column header to sort ascending
2. Click again to sort descending

### Routing
1. Click the **View Appointment Details** button in the template column of the Grid.
2. This will navigate to the appointment details page.

## Reference
The [user guide](https://ej2.syncfusion.com/react/documentation/grid/data-binding/next-js-server) provides detailed directions in a clear, step-by-step format.

