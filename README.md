# Campus Departures

![campus-departures interface](https://wajrock.me/projects/campus-departures/cover.webp)

## Description

This project is a React application designed to be displayed in the buildings of the Beaulieu campus at the University of Rennes. The application provides real-time information on bus and metro schedules at the various stops around the campus, as well as information on the availability of bicycles and free spaces at the bike stations located on the campus. It processes this data and displays upcoming departures, bicycle availability, and other relevant information to keep students informed about their commuting options and enhance their travel experience.

## Features

- **Real-time Data Fetching**: Retrieves bus, metro, and bike station data from STAR's API.
- **Component-based Architecture**: Uses reusable React components for different parts of the user interface.
- **Minimalist Design**: The interface is designed to be clean and minimalist, focusing on essential information.
- **Error Handling**: Includes robust error handling for API requests and data processing.


## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/wajrock/campus-departures.git
    cd your-repository
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the development server and open the application in your default web browser.

### Project Structure

- **`src`**: Contains the main application code.
  - **`components`**: React components used in the application.
  - **`utils`**: Utility functions and context providers.
  - **`Dashboard.tsx`**: Main application component.
  - **`index.tsx`**: Entry point of the application.
- **`public`**: Contains static assets like the `index.html` file.
- **`styles`**: CSS or SCSS files for styling the application.

### API Endpoints

The application fetches data from the following endpoints:

- **Bus Data:**
  - `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records`
  
- **Metro Data:**
  - `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-metro-circulation-deux-prochains-passages-tr/records`

- **Bike Station Data:**
  - `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-etat-tr/records`

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact

For questions or feedback, please reach out to [thibaud.wajrock@outlook.com](mailto:thibaud.wajrock@outlook.com).
