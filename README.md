# VyaktigatavRtta
VyaktigatavRtta is a modern and modular resume builder application. It uses **Angular (latest)** for the frontend, **Golang** for the backend, and **PostgreSQL** as the database.

The UI is built using reusable, standalone components, smart services, and a scalable layout system. It features a drag-and-drop resume editor, theme selector, preview engine, and export functionality.

## 📁 Project Structure

```
src/
└── app/
    ├── core/                        # App-wide services & guards
    │   ├── services/
    │   │   ├── auth.service.ts
    │   │   ├── resume-builder.service.ts
    │   │   ├── export.service.ts
    │   │   ├── theme.service.ts
    │   │   ├── toast.service.ts
    │   │   └── template-render.service.ts
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   └── guest.guard.ts
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts
    │   │   └── error.interceptor.ts

    ├── shared/                      # Reusable components, directives, pipes
    │   ├── components/
    │   │   ├── auth-ui/
    │   │   │   ├── login-form.component.ts
    │   │   │   ├── register-form.component.ts
    │   │   │   ├── social-login.component.ts
    │   │   │   └── auth-card.component.ts
    │   │   ├── resume-fields/
    │   │   │   ├── text-input-field.component.ts
    │   │   │   ├── textarea-field.component.ts
    │   │   │   ├── date-range-field.component.ts
    │   │   │   ├── tag-input-field.component.ts
    │   │   │   ├── markdown-editor.component.ts
    │   │   │   ├── rating-field.component.ts
    │   │   │   └── list-field.component.ts
    │   │   ├── shared-ui/
    │   │   │   ├── button.component.ts
    │   │   │   ├── modal.component.ts
    │   │   │   ├── icon.component.ts
    │   │   │   ├── toggle-switch.component.ts
    │   │   │   ├── confirmation-dialog.component.ts
    │   │   │   └── empty-state.component.ts
    │   │   ├── template-preview/
    │   │   │   ├── template-card.component.ts
    │   │   │   ├── theme-picker.component.ts
    │   │   │   ├── live-preview.component.ts
    │   │   │   ├── font-selector.component.ts
    │   │   │   └── color-palette.component.ts
    │   │   ├── export/
    │   │   │   ├── resume-preview.component.ts
    │   │   │   ├── export-toolbar.component.ts

    │   ├── templates/
    │   │   ├── modern/
    │   │   │   ├── modern-template.component.ts
    │   │   │   └── modern-template.scss
    │   │   ├── creative/
    │   │   │   ├── creative-template.component.ts
    │   │   │   └── creative-template.scss
    │   │   ├── academic/
    │   │   │   ├── academic-template.component.ts
    │   │   │   └── academic-template.scss

    │   ├── directives/
    │   │   ├── drag-handle.directive.ts
    │   │   ├── auto-resize-textarea.directive.ts
    │   │   └── click-outside.directive.ts

    │   ├── pipes/
    │   │   ├── truncate-text.pipe.ts
    │   │   ├── format-date.pipe.ts
    │   │   └── highlight-search.pipe.ts

    ├── layout/
    │   ├── components/
    │   │   ├── topbar/
    │   │   ├── navbar/
    │   │   ├── sidebar/
    │   │   └── footer/
    │   ├── layout.module.ts
    │   ├── layout.component.ts
    │   └── layout.component.html

    ├── features/
    │   ├── welcome/
    │   │   ├── components/
    │   │   │   ├── hero/
    │   │   │   ├── footer/
    │   │   ├── welcome.component.ts
    │   │   ├── welcome.component.html
    │   │   └── welcome.module.ts
    │
    │   ├── dashboard/
    │   │   └── dashboard.component.ts
    │
    │   ├── resume-editor/
    │   │   ├── editor.component.ts
    │   │   └── resume-section.component.ts
    │
    │   ├── resume-preview/
    │   │   └── preview.component.ts
    │
    │   ├── resume-theme/
    │   │   └── theme.component.ts
    │
    │   ├── export-resume/
    │   │   └── export.component.ts
    │
    │   ├── profile-settings/
    │   │   └── settings.component.ts

    ├── app-routing.module.ts
    ├── app.module.ts

```

## Description
VyaktigatavRtta is a modern resume builder application built using Angular (latest version), SCSS, and TypeScript for the frontend, Golang for the backend, and PostgreSQL as the database.


---

## 🔍 Modules Overview

### 🧠 1. Core Module
Manages all essential services, state management, route security, and global interceptors.

| Folder        | Purpose                                      |
|---------------|----------------------------------------------|
| `services/`   | Auth, API, Resume Builder, Theme, Export     |
| `guards/`     | Route protection                            |
| `interceptors/` | HTTP request interception & error handling |

---

### 📦 2. Shared Module (Reusable Library)
Contains all reusable building blocks of the UI.

- `auth-ui/`: Login, Register, Social Auth
- `resume-fields/`: Text, Tags, Markdown, Dates
- `shared-ui/`: Buttons, Modals, Toggles, Icons
- `template-preview/`: Templates, Theme pickers
- `export/`: Resume preview, export toolbar
- `directives/`: Drag, resize, outside-click
- `pipes/`: Date formatting, truncation, highlighting

✅ *This folder acts as a self-maintained UI library.*

---

### 🧱 3. Layout Module
Provides the app shell and layout components.

- `topbar/`
- `navbar/`
- `sidebar/`
- `footer/`

---

### 🚀 4. Features Module
All route-level features:

- **Welcome**: Landing page
- **Dashboard**: Resume list
- **Resume Editor**: Section builder
- **Resume Preview**: Read-only view
- **Resume Theme**: Pick and apply themes
- **Export Resume**: Export as PDF/shareable link
- **Profile Settings**: User settings, preferences

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/nilabhsubramaniam/ida.git

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

🧑‍💻 Contribution Guidelines

-   Use Angular best practices (standalone components, modules).
-   Follow feature-based folder structure.
-   Use SCSS with consistent naming (kebab-case).
-   Write clean, type-safe TypeScript with interfaces.
-   Prefer reactive forms over template-driven forms.
-   Reuse from shared/ — keep DRY.

## License
VyaktigatavRtta is licensed under the MIT License.

