# UI Directory

This directory contains the implementation of our design system using Shad UI, following the principles of atomic design. The design system is structured into two main categories: **primitives** and **components**.

## Atomic Design System

Our design system is built on the concept of atomic design, which breaks down the UI into smaller, reusable pieces. This approach allows for a more scalable and maintainable codebase. For a comprehensive understanding of atomic design, please refer to [Brad Frost's Atomic Design Blog](http://bradfrost.com/blog/post/atomic-web-design/).

### Primitives

Primitives are the building blocks of our design system. They are **stateless** components that encapsulate basic UI elements and styles. These components do not manage any state and are purely presentational. They are designed to be highly reusable and composable.

### Components

Components are **stateful** and manage their own state or rely on external state management. They are composed of primitives and other components to create more complex UI elements. Components are designed to encapsulate specific functionality and behavior.

### Organisms

Organisms are complex UI components that are composed of groups of molecules and/or atoms. They form distinct sections of an interface, such as a navigation bar or a footer. Organisms are designed to be reusable across different pages or templates, providing a consistent look and feel.

### Effects

Effects refer to animations and transitions that enhance the user experience by providing visual feedback or guiding user interactions. They are used to make the interface more dynamic and engaging. Effects should be used sparingly to avoid overwhelming the user and should always serve a functional purpose.

## Using Shad UI

Shad UI is a library that provides a set of customizable and accessible UI components. We leverage Shad UI to build our design system, ensuring consistency and ease of use across the application.

## Conclusion

By organizing our UI into primitives, components, organisms, and effects, we achieve a modular and scalable design system. This approach allows for easy maintenance and updates, ensuring a consistent user experience throughout the application.

For more details on each component, please refer to the respective files in the `src/ui` directory.
