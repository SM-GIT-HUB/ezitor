# Ezitor: The Ultimate Online Code Editor 💻

Ezitor is a powerful and intuitive online code editor designed for developers of all skill levels. Whether you're a seasoned programmer or just starting your coding journey, Ezitor provides a seamless and feature-rich environment to write, run, and share code snippets. It solves the problem of needing local development environments for quick coding tasks, offering a browser-based solution with support for multiple languages, themes, and real-time output.

## 🚀 Key Features

- **Multi-Language Support:** Supports a wide range of programming languages, including JavaScript, Python, and more. 🌐
- **Real-time Code Execution:**  Execute code snippets directly in the browser and see the results instantly. ⚡
- **Monaco Editor Integration:**  Powered by the Monaco Editor, the same editor used in VS Code, providing a familiar and powerful coding experience. ✍️
- **Customizable Themes:**  Choose from a variety of themes to personalize your coding environment. 🎨
- **Code Sharing:**  Easily share your code snippets with others. 📤
- **Syntax Highlighting:**  Enjoy automatic syntax highlighting for various languages. ✨
- **Responsive Design:**  Works seamlessly on desktops, tablets, and mobile devices. 📱
- **Authentication:** Secure user authentication and management. 🔒
- **Local Storage Persistence:** Code is saved in local storage, so you don't lose your work. 💾

## 🛠️ Tech Stack

| Category    | Technology                                  | Description                                                                                                |
|-------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Frontend**  | Next.js 15.0.3                             | React framework for building user interfaces with server-side rendering and static site generation.       |
|             | React 19.0.0-rc-66855b96-20241106          | JavaScript library for building user interfaces.                                                           |
|             | Monaco Editor                               | Code editor component (the same one used in VS Code).                                                      |
|             | `@monaco-editor/react`                      | React wrapper for the Monaco Editor.                                                                       |
|             | Tailwind CSS                                | Utility-first CSS framework for styling.                                                                   |
|             | Framer Motion                               | Motion and animation library for React.                                                                    |
|             | Lucide React                                | Collection of beautiful, consistent icons as React components.                                              |
|             | React Hot Toast                             | Library for displaying toast notifications.                                                                 |
|             | React Syntax Highlighter                    | Component for syntax highlighting code snippets.                                                            |
| **Backend**   | Convex                                      | Full-stack development platform for backend logic, database, and real-time functionality.                  |
| **Authentication** | Clerk                                       | Authentication and user management library for Next.js.                                                   |
| **State Management** | Zustand                                     | Small, fast, and scalable bearbones state-management solution.                                           |
| **Build Tools** | TypeScript                                | Superset of JavaScript that adds static typing.                                                             |
|             | PostCSS                                     | Tool for transforming CSS with JavaScript.                                                                 |
| **Other**     | Svix                                        | Library for handling webhooks.                                                                             |
|             | next/font/local                             | For loading local fonts.                                                                                     |

## 📦 Getting Started / Setup Instructions

### Prerequisites

- Node.js (version >= 18)
- npm or Yarn package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd ezitor
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

1.  Select a programming language from the language dropdown.
2.  Write your code in the editor panel.
3.  Click the "Run" button to execute the code.
4.  View the output in the output panel.
5.  Customize the editor theme and font size to your liking.
6.  Share your code snippets with others using the share button.

## 📂 Project Structure

```
ezitor/
├── .next/                     # Next.js build output
├── src/                        # Source code directory
│   ├── app/                    # Next.js app router directory
│   │   ├── (root)/             # Root layout and pages
│   │   │   ├── _constants/     # Constants (language configurations)
│   │   │   │   └── index.ts
│   │   │   ├── _components/    # Reusable components
│   │   │   │   ├── EditorPanel.tsx
│   │   │   │   ├── OutputPanel.tsx
│   │   │   │   ├── Header.tsx
│   │   │   ├── page.tsx        # Home page component
│   │   ├── layout.tsx          # Root layout component
│   │   ├── loading.tsx         # Loading component
│   │   └── globals.css         # Global CSS styles
├── public/                     # Public assets (images, fonts, etc.)
├── convex/                     # Convex backend code
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── next.config.ts            # Next.js configuration file
├── package-lock.json         # Records the exact versions of dependencies
├── package.json              # Project metadata, dependencies, and scripts
├── postcss.config.mjs        # PostCSS configuration file
├── README.md                 # Project overview and instructions
├── tailwind.config.ts        # Tailwind CSS configuration file
└── tsconfig.json             # TypeScript configuration file
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).



