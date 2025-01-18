# Async Challenge App

This repository is a solution for the **Async Challenge**, implemented using **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## Description

This application solves the task of handling asynchronous requests, demonstrating state management, error handling, and async operations in React. The app manages the number of concurrent requests, sorts them by creation time, and displays the status of each request.

The solution is divided into three levels of difficulty, each adding more functionality.

## Task Description

**Task Description:**

Create a simple app that allows the user to save a hypothetical file to the server. When the button is clicked, a save request is sent to the server. It's important to handle possible server-side errors appropriately.

**Task Levels:**

1. **Single Request Only** — Ensure that only one request can be sent at a time. No parallel requests should be allowed.
2. **Limit to Three Parallel Requests** — Allow up to three requests to be sent in parallel. No more than three requests should run simultaneously.
3. **Three Parallel Requests with Feedback** — Allow up to three requests to be sent in parallel (maximum of three). Additionally, inform the user about the status of each action—whether the file was saved successfully or not.

## Technologies Used

- **React** — A JavaScript library for building user interfaces.
- **TypeScript** — A superset of JavaScript that adds static typing.
- **Tailwind CSS** — A utility-first CSS framework for styling.
- **Vite** — A next-generation front-end tool that serves the app during development with fast hot module replacement.

## Features

- **Request Limiting**: Ensures no more than three parallel requests are allowed at any time.
- **Request Feedback**: Provides real-time feedback for each request, showing success or error messages.
- **Sorting**: Requests can be sorted by their creation time in ascending or descending order.
