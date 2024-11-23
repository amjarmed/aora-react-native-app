/*
 notes

 1. declare
 - Declaring global types, interfaces, or variables.
 - Defining modules or external libraries without TypeScript types.
- Used in .d.ts files to declare ambient types.

2. export
- Sharing interfaces, types, or other members between files in a project.
- Promoting modularity and explicit dependencies.

*/

// for images
declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

// custom button
// interface
declare interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
}

// sign in form

declare interface SignInForm {
  email: string;
  password: string;
}

// sign up form
declare interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

// TrendingProps interface
declare interface TrendingProps {
  posts: Post[];
}
