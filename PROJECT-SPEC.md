# BankApp Project Specification

This document provides a detailed technical specification for the BankApp Angular project. It covers the architecture, modules, routing, and shared components.

---

## Project Structure

- **src/app/**
  - **core/**: Domain logic and services (e.g., `account.ts`)
  - **features/**: Feature modules (login, dashboard, transfer, history)
  - **shared/**: Reusable UI components (e.g., `bank-button`)
  - **app.ts, app.html, app.routes.ts, app.config.ts**: Root application files

---

## Modules Overview

### 1. Core Module

- **Purpose**: Contains domain models and singleton services.
- **Key File**: `core/account.ts`
  - **AccountService**: Manages account creation, retrieval, and fund transfers.
  - **AccountType**: Enum for account types (`Chequing`, `Savings`).
  - **Account**: Interface for account data structure.

### 2. Features Modules

#### a. Login Module

- **File**: `features/login/login.ts`
- **Component**: `LoginComponent`
- **Purpose**: Allows users to create new accounts.
- **Details**:
  - Uses reactive forms for input validation.
  - On successful creation, navigates to the dashboard.

#### b. Dashboard Module

- **File**: `features/dashboard/dashboard.ts`
- **Component**: `DashboardComponent`
- **Purpose**: Displays a list of all user accounts.
- **Details**:
  - Fetches accounts from `AccountService`.
  - Shows account name, type, and balance.

#### c. Transfer Module

- **File**: `features/transfer/transfer.ts`
- **Component**: `TransferComponent`
- **Purpose**: Enables fund transfers between accounts.
- **Details**:
  - Uses reactive forms for selecting accounts and entering amounts.
  - Validates input and calls `AccountService.transfer`.

#### d. History Module

- **File**: `features/history/history.ts`
- **Component**: `HistoryComponent`
- **Purpose**: Displays transaction history for all accounts.
- **Details**:
  - Reactive filter for searching transactions.
  - Shows account, type, recipient, amount, and timestamp.

---

## Routing

- **File**: `app.routes.ts`
- **Angular Router** is used for navigation between features.
- **Route Definitions**:
  - `/login`: Lazy loads `LoginComponent`.
  - `/dashboard`: Lazy loads `DashboardComponent`.
  - `/transfer`: Lazy loads `TransferComponent`.
  - `/history`: Lazy loads `HistoryComponent`.
  - `''` and `**`: Redirect to `/login` for empty or unknown paths.

**Lazy Loading**: Each feature route uses `loadComponent` for lazy loading, improving performance and reducing initial bundle size.

**Router Outlet**: The root template (`app.html`) contains `<router-outlet>`, which displays the active route's component.

---

## Shared Module

- **File**: `shared/shared-module.ts`
- **Purpose**: Provides reusable UI components across features.
- **Key Component**: `BankButtonComponent`
  - Custom button supporting Bootstrap variants and account types.
  - Used for form submissions and actions in feature modules.

**Usage**: SharedModule is imported into feature modules to access shared components.

---

## Application Bootstrap

- **File**: `main.ts`
- **Bootstrap**: Uses `bootstrapApplication` with router providers.
- **Configuration**: `app.config.ts` sets up global error listeners, zone change detection, and router.

---

## Best Practices

- **Standalone Components**: All components are standalone, not using NgModules.
- **Signals**: Angular signals are used for local state management.
- **Reactive Forms**: Preferred for form handling and validation.
- **Change Detection**: Components use OnPush strategy for performance.
- **Routing**: Feature routes are lazy-loaded for scalability.

---

## Summary

BankApp is a modular Angular application with clear separation of concerns:
- **Core** for business logic,
- **Features** for user-facing functionality,
- **Shared** for reusable UI,
- **Routing** for navigation,
- **Bootstrap** for initialization.

Each module is designed for maintainability, scalability, and performance.
