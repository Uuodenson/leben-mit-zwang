# Project Structure

This project follows a clean and organized structure for better maintainability and scalability.

## Directory Structure

```
src/
├── app/                    # Next.js app directory (pages and routes)
├── components/            # React components
│   ├── common/           # Shared/reusable components
│   ├── layout/           # Layout components (header, footer, etc.)
│   ├── auth/             # Authentication-related components
│   └── profile/          # Profile-related components
├── lib/                  # Library code
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── api/              # API integration (Firebase, Gemini)
├── hooks/                # Custom React hooks
└── styles/               # Global styles and CSS modules
```

## Key Directories

- `app/`: Contains the Next.js pages and API routes
- `components/`: Reusable React components organized by domain
- `lib/`: Shared utilities, types, and API integrations
- `hooks/`: Custom React hooks for shared logic
- `styles/`: Global styles and CSS modules

## Best Practices

1. Keep components small and focused
2. Use TypeScript for better type safety
3. Follow the Next.js App Router conventions
4. Keep API integrations in the lib/api directory
5. Use CSS modules for component-specific styles
