# IDA - Interactive Development Assistant

IDA is a modern and modular resume builder application. It uses **Angular 19** for the frontend, **Golang** for the backend, and **PostgreSQL** as the database.

The UI is built using reusable, standalone components, smart services, and a scalable layout system. It features a drag-and-drop resume editor, theme selector, preview engine, export functionality, and an immersive Three.js background animation that creates a dynamic starfield effect with colorful nebula clouds and atmospheric lighting.


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
    │   │   ├── template-render.service.ts
    │   │   └── three-background.service.ts      # Dynamic starfield animation
    │   ├── guards/
    │   │   ├── auth.guard.ts
    │   │   └── guest.guard.ts
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts
    │   │   └── error.interceptor.ts

    ├── shared/                      # Reusable components, directives, pipes
    │   ├── components/
    │   │   ├── three-background/               # Three.js background component
    │   │   │   └── three-background.component.ts
    │   │   ├── theme-background/               # Alternative Three.js component
    │   │   │   └── theme-background.component.ts
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
IDA is a modern resume builder application built using Angular (latest version), SCSS, and TypeScript for the frontend, Golang for the backend, and PostgreSQL as the database. The application features an immersive user interface with a dynamic Three.js background animation that creates a starfield effect with cosmic nebula and subtle lighting.


---

## 🔍 Modules Overview

### 🧠 1. Core Module
Manages all essential services, state management, route security, and global interceptors.

| Folder        | Purpose                                      |
|---------------|----------------------------------------------|
| `services/`   | Auth, API, Resume Builder, Theme, Export, Three.js Background |
| `guards/`     | Route protection                            |
| `interceptors/` | HTTP request interception & error handling |

The `ThreeBackgroundService` provides a dynamic, interactive starfield animation using Three.js. It features:
- A cosmic nebula with stars, dust particles, and subtle lighting effects
- Parallax star movement for a sense of depth
- Optimized performance with custom shaders and texture handling
- Responsive design that adapts to container size

---

### 📦 2. Shared Module (Reusable Library)
Contains all reusable building blocks of the UI.

- `three-background/`: Dynamic starfield background animation component
- `theme-background/`: Alternative implementation of background animation
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
   cd ida
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

IDA is licensed under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2025 Nilabh Subramaniam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

