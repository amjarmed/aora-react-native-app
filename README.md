# Aora reacat native app

## duration

- day 1 : 00:07:00:00 | setup and basics
- day 2 : 00:08:35:00 |
- day 3 : 00:09:34:00 |
- day 5 : 00:10:15:00 |
- day 6 : 00:10:50:00 |
- day 6 : 00:11:59:46 |

## notes

- **expo:** like create-reactapp and next, it provide many tools & services that simplify the development process and help build app more easily, with expo you don't have to worry about configuring your :
  - Dev environment
  - native dependencies
  - installing android studio/ xcode

expo offers pre-built components & APIs for: navigation, gestures, camera , maps

- use appwrite as backend for db
- learn how to create global state

## naming

- Screens : Represent different pages or views in the app.
- Onboarding: The process of introducing new users to the app with guidance or tutorials
- Stack : Refers to a "stack" of screens managed by navigation (e.g., React Navigation stack navigator)
- Context: A React API for sharing state or props across components without passing them explicitly.
- Splash:

## Typescript Notes

---

- Define Props and State: Use interfaces or types for components' props and state.

```ts
interface ButtonProps {
  title: string;
  onPress: () => void;
}
```

- Strong Typing for API Responses: Create interfaces or types for expected data structures.

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://api.example.com/users");
  return response.json();
};
```

- Typing for Context: Ensure global state management is type-safe

```ts
interface AppContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
```

- Use Union Types for Options:

```ts
type ButtonVariant = "primary" | "secondary";
interface ButtonProps {
  title: string;
  variant: ButtonVariant;
}
```

- Utilize Context API or State Libraries

```tsx
interface UserContext {
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;
}

const UserContext = createContext<UserContext | undefined>(undefined);
```

- Generics: Use generics for reusable components or functions

```tsx
function useFetch<T>(url: string): T {
  const [data, setData] = useState<T | null>(null);
  // Fetch logic...
  return data;
}
```

- Discriminated Unions: Handle complex state with unions:

```ts
type ApiResponse =
  | { success: true; data: string[] }
  | { success: false; error: string };

function fetchData(): ApiResponse {
  return { success: true, data: ["item1", "item2"] };
}
```

- Custom Hooks: Add type definitions for reusable hooks.

```ts
function useToggle(initial: boolean): [boolean, () => void] {
  const [state, setState] = useState(initial);
  const toggle = () => setState(!state);
  return [state, toggle];
}
```
