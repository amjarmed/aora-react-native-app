export const AppTheme = {
  primary: "#161622",
  secondary: "#FF9C01",
  placeholderTextColor: "#7b7b8b",
  wrapperStyle: "bg-primary h-full",
  containerStyle: "px-4 my-6",
  tabBarActiveTintColor: "#FFA001",
  tabBarInactiveTintColor: "#CDCDE0",
} as const;
export type AppTheme = typeof AppTheme;
