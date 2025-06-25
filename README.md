# 📝 MakeNote - Collaborative Notion-Inspired Document Editor

MakeNote is a powerful, real-time collaborative document editor inspired by Notion. Designed with performance, scalability, and collaboration in mind, this app allows users to create, edit, and share documents effortlessly with modern features like AI integration, access control, and real-time syncing.

---

## 🚀 Features

### 🔐 Authentication & Access Control

* Authentication powered by **Clerk**, allowing sign-in via Google, GitHub, and more.
* All routes are **fully protected**.
* **Document ownership control**: Only the document owner can delete or manage invitations.
* **Email-based collaboration invitations**.
* Track how many users have access to each document.

### 🧑‍💻 Real-Time Collaborative Editor

* Built using **Liveblocks**, **Yjs**, and **BlockNote**.
* See other users’ **live cursors** and actions as they type.
* Supports over **10+ users simultaneously**.
* Live **role-based access sync** across all sessions.
* Change and update **document names** in real-time.

### ✍️ Rich Text Features

* Interactive **slash commands (/)** for block creation.
* Supported block types:

  * Headings (H1, H2, H3)
  * Paragraphs
  * Code blocks
  * Tables
  * Bullet lists
  * Images (upload, resize)
* Customize **font color**, **background color**, and **font styles**.
* Integrated **dark mode** toggle.
* **Breadcrumb navigation** for context-aware editing.

### 🤖 AI-Powered Tools

* **Chat with Document**: Ask questions about the content and receive context-aware responses.
* **Multi-language Translation**: Translate the document summary to different languages using AI.

---

## 🛠️ Tech Stack

| Technology             | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| **Next.js 14**         | Server-side rendering for SEO and performance                   |
| **TypeScript**         | Type safety and developer productivity                          |
| **Firebase**           | Real-time database for document data and user presence tracking |
| **Cloudflare Workers** | Lightweight, fast backend using edge functions                  |
| **Clerk**              | Authentication & user management                                |
| **Liveblocks**         | Real-time collaboration & presence                              |
| **Yjs**                | CRDT-based data sync                                            |
| **BlockNote**          | Rich, Notion-style editor                                       |
| **Shadcn UI**          | Modern, accessible UI components                                |

---

## 📸 Screenshots (Coming Soon)

> Add screenshots/gifs of live editing, slash command, and AI features.

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/makenote.git
cd makenote
npm install
npm run dev
```

---

## 🌐 Live Demo

[👉 Click here to try the app](https://makenote-chi.vercel.app/)

---

## 🤝 Contributions

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

None

---

## 💡 Inspiration

Inspired by Notion’s seamless collaboration and UI but built with a modern, scalable full-stack architecture. MakeNote combines power and simplicity with performance-driven technologies.

---

## 📬 Contact

For questions or feedback, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/ayushbansal0520) or open an issue.

---

Made with ❤️ by Ayush
