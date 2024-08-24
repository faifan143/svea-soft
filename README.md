# Exchange Rates Dashboard

This is a React-based dashboard application built with Next.js that fetches and displays exchange rates for different currencies. It leverages the Alpha Vantage API to provide real-time currency exchange rates and historical data.

## Features

- **Real-time Currency Exchange Rates:** Get up-to-date exchange rates for any currency.
- **Historical Data:** View historical exchange rate data for a specified date range.
- **Custom Search:** Search by currency code and filter results by date range.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js (version 14.x or later) from [Node.js official website](https://nodejs.org/).
- **npm**: Node.js comes with npm pre-installed. You can check if you have it by running `npm -v` in your terminal.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/faifan143/svea-soft.git
cd svea-soft
```

### 2. Install Dependencies

After navigating to the project directory, install the necessary dependencies by running:

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env.local file in the root directory of your project to store your environment variables. This file should include the Alpha Vantage API key. Replace YOUR_API_KEY_HERE with your actual API key.

```bash
NEXT_PUBLIC_ALPHAVANTAGE_API_KEY=YOUR_API_KEY_HERE
```

Note: The API key is required to fetch data from the Alpha Vantage API. You can obtain your API key by signing up at [Alpha Vantage](https://www.alphavantage.co/documentation/).

### 4. Run the Application

After setting up your environment variables, start the development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the application.
