# Contributing to Egreen Quanta

Welcome to the team! We are building a modern, AI-powered interactive platform for quantum algorithms. 

## Workflow

1. **Clone the Repository**
   Make sure you have cloned the repository locally.

2. **Pick a Task**
   Check the team Kanban board or task tracker. Assign yourself a task before starting.

3. **Create a Branch**
   Always create a new branch for your work based on `main`.
   ```bash
   git checkout -b feature/your-feature-name
   # OR
   git checkout -b bugfix/your-bugfix-name
   ```

4. **Develop and Test**
   - **Frontend**: Write clean, modular React components. Use Tailwind CSS for styling. Place reusable UI components in `frontend/src/components/ui`.
   - **Backend**: Follow FastAPI best practices. Document your endpoints. Ensure any quantum simulation logic is well-commented.
   - Run local tests before committing.

5. **Commit Your Changes**
   Write clear, concise commit messages.
   ```bash
   git commit -m "Add Shadcn UI navbar component"
   ```

6. **Open a Pull Request**
   Push your branch to GitHub and open a PR against the `main` branch. Request a review from at least one teammate.

## Environment Variables
If your work requires new API keys (e.g., for LLMs or external services), do **not** commit them to version control. Add them to the `.env` file (which is ignored by Git) and inform the team to update their local `.env` files.

Happy coding!
