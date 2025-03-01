# VyaktigatavRtta

## Project Structure

```
VyaktigatavRtta/
│── src/
│   ├── app/
│   │   ├── core/                  # Core services & utilities
│   │   │   ├── services/          # API, state management
│   │   │   ├── guards/            # Route guards
│   │   │   ├── interceptors/      # HTTP interceptors
│   │   ├── shared/                # Reusable UI components
│   │   │   ├── components/        # Buttons, modals, etc.
│   │   │   ├── directives/        # Custom directives
│   │   │   ├── pipes/             # Custom pipes
│   │   ├── layout/                # Layout module
│   │   │   ├── components/
│   │   │   │   ├── topbar/        # Header/Topbar
│   │   │   │   ├── navbar/        # Navigation bar
│   │   │   │   ├── sidebar/       # Sidebar
│   │   │   │   ├── footer/        # Footer
│   │   │   ├── layout.module.ts   # Declares & exports layout components
│   │   │   ├── layout.component.ts # Wraps content inside layout
│   │   ├──  features/              
│   │   │   ├── welcome/            # Welcome module
│   │   │   │   ├── components/
│   │   │   │   │   ├── topbar/     # Dark mode toggle & login button
│   │   │   │   │   ├── hero/       # Main CTA & tagline
│   │   │   │   │   ├── footer/     # Minimal footer
│   │   │   │   ├── welcome.module.ts # Welcome module setup
│   │   │   │   ├── welcome.component.ts # Logic for Welcome
│   │   │   │   ├── welcome.component.html # UI layout
│   │   │   │   ├── welcome.component.scss # Styling
│   │   │   ├── resume-editor/      # Resume editing module
│   │   │   ├── resume-preview/     # Resume preview module
│   │   │   ├── resume-theme/       # Theme selection module
│   │   │   ├── export-resume/      # Export module
│   │   ├── app-routing.module.ts   # Routes configuration
│   │   ├── app.module.ts           # Root module
│   ├── assets/                     # Static files
│   ├── environments/                # Environment config
│   ├── styles/                     
│   │   ├── base/                   # Global styles
│   │   ├── themes/                 # Theme-based SCSS
│   ├── index.html                   # Main HTML
│   ├── main.ts                      # Angular bootstrap
```

## Description
VyaktigatavRtta is a modern resume builder application built using Angular (latest version), SCSS, and TypeScript for the frontend, Golang for the backend, and PostgreSQL as the database.

## Modules Overview

### **1. Core Module**
- Manages essential services such as API calls, authentication, and route guards.

### **2. Shared Module**
- Contains reusable components, directives, and pipes.

### **3. Layout Module**
- Provides a structured UI with a topbar, navbar, sidebar, and footer.

### **4. Features Module**
- **Resume Editor**: Allows users to create and edit resumes.
- **Resume Preview**: Provides a preview before finalizing.
- **Resume Theme**: Enables theme selection.
- **Export Resume**: Facilitates resume download/export options.

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/nilabhsubramaniam/ida.git
   ```
2. Navigate to the project directory:
   ```sh
   cd vyaktigatavrtta
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   ng serve
   ```
5. Open your browser and go to:
   ```sh
   http://localhost:4200
   ```

## Contribution
- Follow best practices for Angular development.
- Use TypeScript class-based structure.
- Maintain clean and modular SCSS.

## License
VyaktigatavRtta is licensed under the MIT License.

