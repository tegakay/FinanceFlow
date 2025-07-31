
# Finance V4 Project

## Overview

Finance V4 is a comprehensive financial management application designed to help users track expenses, manage budgets, and analyze financial data efficiently. The project aims to provide intuitive tools for both personal and small business finance, with a focus on usability, security, and insightful analytics.

## Features

- Expense tracking with customizable categories and tags
- Budget creation, allocation, and monitoring
- Financial analytics and reporting dashboards
- Goal setting and progress tracking
- Investment and account management
- User authentication and data security
- Responsive and accessible user interface
- Exportable reports (CSV, PDF)
- Multi-currency and theme support

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context, React Query (@tanstack/react-query)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Authentication:** Supabase Auth (JWT)
- **Deployment:** Docker, GitHub Actions, Vercel/Netlify (optional)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/finance-v4.git
    cd finance-v4
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Open `.env` and set the following variables:

      | Variable Name             | Description                                 | Example Value                        |
      |--------------------------|---------------------------------------------|--------------------------------------|
      | `VITE_SUPABASE_URL`      | Your Supabase project URL                   | `https://xyzcompany.supabase.co`     |
      | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon API key                  | `your-anon-key`                      |
      | `VITE_JWT_SECRET`        | JWT secret for authentication (if required) | `your-jwt-secret`                    |
      | `VITE_APP_ENV`           | Application environment (optional)          | `development` or `production`        |
      | `VITE_DEFAULT_CURRENCY`  | Default currency (optional)                 | `USD`                                |
      | `VITE_DEFAULT_THEME`     | Default theme (optional)                    | `light` or `dark`                    |

    - You can obtain your Supabase credentials from your [Supabase project dashboard](https://app.supabase.com/).
    - If you add more environment variables, document them in `.env.example` for clarity.

4. **Run the application:**
    ```bash
    npm start
    # or
    yarn start
    ```

### Optional: Running with Docker

You can use Docker for local development and deployment:

```bash
docker build -t finance-v4 .
docker run -p 3000:3000 --env-file .env finance-v4
```

## Usage

1. Register or log in to your account.
2. Add expenses and categorize them.
3. Set up budgets and monitor spending.
4. Track goals and investments.
5. View analytics and export reports.

## Folder Structure

- `src/components/` - UI components (Auth, Dashboard, Modals, etc.)
- `src/contexts/`   - React Context providers (Auth, Finance)
- `src/hooks/`      - Custom React hooks
- `src/libs/`       - Library and utility files (e.g., queryClient, supabaseClient)
- `src/services/`   - API and business logic
- `src/types/`      - TypeScript type definitions

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [kofitega@gmail.com](mailto:kofitega@gmail.com).