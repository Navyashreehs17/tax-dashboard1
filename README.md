# 🚀 Tax Entities Dashboard

A modern, professional Tax Entities management dashboard built with React, TypeScript, TanStack Table, and a beautiful pastel design system.

## 📸 Features

✅ **TanStack React Table** - Advanced table with sorting, filtering, and sticky headers
✅ **Real-time Editing** - Modal-based editing with optimistic updates
✅ **API Integration** - Full CRUD operations with MockAPI
✅ **Country Dropdown** - Dynamic country selection from API
✅ **Toast Notifications** - Success/error feedback with react-hot-toast
✅ **Responsive Design** - Works perfectly on all screen sizes
✅ **TypeScript** - Full type safety throughout the application
✅ **Modern UI** - Soft pastel gradients, glassmorphism, smooth animations
✅ **Clean Architecture** - Organized with hooks, services, components, types

## 🎨 Design System

- **Colors**: Mint (#EAF7F3) → Lavender (#EDE5FA) gradient background
- **Typography**: System fonts (-apple-system, Segoe UI, Roboto)
- **Spacing**: Generous padding for airy, calm feel
- **Shadows**: Soft, blurred shadows with purple tones
- **Borders**: 30px border radius for modern card design
- **Gender Badges**: 
  - Male: Sky blue (#9FC9F3)
  - Female: Soft pink (#F7C6D9)
- **Edit Button**: Light purple gradient with indigo icon

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Table/           # TanStack Table implementation
│   │   ├── TaxTable.tsx    # Main table component with sorting/filtering
│   │   ├── columns.tsx     # Column definitions with custom cells
│   │   └── index.ts        # Barrel export
│   ├── EditModal/       # Edit modal component
│   │   ├── EditModal.tsx   # Form with validation & API integration
│   │   └── index.ts
│   └── UI/              # Basic UI components
│       ├── Button.tsx      # Reusable button
│       ├── Input.tsx       # Text input with label
│       ├── Select.tsx      # Dropdown select
│       ├── Modal.tsx       # Modal wrapper (legacy)
│       └── Loader.tsx      # Loading spinner
├── hooks/               # Custom React hooks
│   ├── useTaxes.ts        # Fetch and manage tax entities
│   ├── useCountries.ts    # Fetch countries
│   └── useUpdateTax.ts    # Handle PUT requests
├── services/            # API service layer
│   ├── taxService.ts      # Tax entity CRUD operations
│   └── countryService.ts  # Country fetching
├── types/               # TypeScript interfaces
│   ├── Tax.ts            # Tax entity type
│   └── Country.ts        # Country type
├── utils/               # Utility functions
│   └── formatDate.ts     # Date formatting helper
├── pages/               # Page components
│   └── Dashboard.tsx     # Main dashboard page
├── App.tsx             # Root component with Toaster
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind

Configuration Files:
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.js       # Vite build configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS with @tailwindcss/postcss
└── index.html           # HTML entry point
```

## 🔌 API Endpoints

All endpoints use MockAPI:

**Tax Entities:**
- `GET` https://685013d7e7c42cfd17974a33.mockapi.io/taxes
- `GET` https://685013d7e7c42cfd17974a33.mockapi.io/taxes/:id
- `PUT` https://685013d7e7c42cfd17974a33.mockapi.io/taxes/:id

**Countries:**
- `GET` https://685013d7e7c42cfd17974a33.mockapi.io/countries

## 📦 Technologies

- **React** 18.3.1 - UI library
- **TypeScript** - Type safety
- **Vite** 5.4.21 - Build tool & dev server
- **TanStack React Table** - Advanced table features
- **Tailwind CSS** 4.x - Utility-first CSS with @tailwindcss/postcss
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```
(Port may vary if 5173 is occupied - check terminal output)

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run tsc
```

## 🎯 Key Features Implementation

### TanStack Table
- **Sorting**: Click column headers to sort (ascending/descending)
- **Filtering**: Click filter icon next to "COUNTRY" to filter by country
- **Sticky Header**: Header stays visible while scrolling
- **Custom Cells**: Gender badges, formatted dates, clickable entity names

### Edit Modal
- **Validation**: Required field checking before submission
- **Loading State**: Disabled form during API call
- **Error Handling**: Toast notifications for success/error
- **Country Dropdown**: Populated from countries API
- **Optimistic Update**: Table refreshes after successful save
- **Click Outside**: Close modal by clicking backdrop
- **Escape Key**: Close modal with ESC key

### Custom Hooks
- `useTaxes()` - Fetches taxes, manages loading/error, provides refetch
- `useCountries()` - Fetches countries list
- `useUpdateTax()` - Handles PUT request with toast notifications

### Service Layer
Clean separation of API logic:
```typescript
// taxService.ts
export const getTaxes = async (): Promise<Tax[]> => { ... }
export const getTaxById = async (id: string): Promise<Tax> => { ... }
export const updateTax = async (id: string, data: Partial<Tax>): Promise<Tax> => { ... }
```

## 🎨 UI Components

### Gender Badges
Pill-shaped badges with gender icons:
- Male: ♂ Sky blue background
- Female: ♀ Soft pink background

### Edit Button
- Circular button with purple gradient
- Hover effect: Lift and scale animation
- Purple pencil icon

### Table Styling
- Soft gradient header (cyan → pink)
- Light dividers between rows
- Hover effect: Row lift with shadow
- Rounded corners (30px)

## 🐛 Troubleshooting

**Port already in use:**
- Vite will automatically try the next available port
- Check terminal output for actual port number

**Edit button not working:**
- Check browser console (F12) for errors
- Look for "Edit clicked for:" log message
- Verify modal z-index is 9999

**Modal not appearing:**
- Ensure `isModalOpen` state is true in Dashboard
- Check that `tax` prop is not null
- Verify modal z-index and backdrop are rendering

**API errors:**
- Check network tab in browser DevTools
- Verify MockAPI endpoints are accessible
- Check for CORS issues (shouldn't happen with MockAPI)

## 📝 Development Notes

### State Management
- Local component state with `useState`
- No global state library needed for this scope
- Props drilling handled cleanly through component hierarchy

### Type Safety
All entities are typed:
```typescript
interface Tax {
  id: string;
  entity: string;
  gender: string;
  requestDate: string;
  country: string;
}
```

### Styling Approach
- Tailwind CSS for utility classes
- Inline styles for dynamic values and complex gradients
- CSS-in-JS for hover states and animations
- No CSS modules or styled-components needed

## 🚧 Future Enhancements

Potential improvements:
- [ ] Add pagination for large datasets
- [ ] Implement search functionality
- [ ] Add bulk edit/delete operations
- [ ] Export table data to CSV/Excel
- [ ] Add user authentication
- [ ] Implement row selection with checkboxes
- [ ] Add keyboard navigation
- [ ] Dark mode toggle
- [ ] Advanced filtering with multiple criteria
- [ ] Real-time updates with WebSocket

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and TanStack Table

---

**Happy Coding! 🎉**

For questions or issues, check the browser console and network tab first. Most issues can be debugged through these tools.
