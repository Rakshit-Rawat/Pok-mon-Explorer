# Pokémon Explorer

A React-based interactive application that allows users to explore and search through Pokémon data from the PokeAPI, styled with TailwindCSS and enhanced with Lucide React icons.

![Pokémon Explorer Screenshot](/screenshots/main.png)



## 📋 Features

- **Data Display**: View the first 150 Pokémon with their names, images, types, and ID numbers
- **Search Functionality**: Filter Pokémon by name in real-time
- **Type Filtering**: Filter Pokémon by their types (Fire, Water, Grass, etc.)
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **User-Friendly Interface**: Clean and intuitive UI with appropriate loading and error states

## 🛠️ Technologies Used

- **React.js**: Frontend library for building the user interface
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for enhanced UI elements
- **PokeAPI**: RESTful API providing Pokémon data

## 🚀 Installation and Setup

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Visit `http://localhost:3000` to view the application

### Live Deployed Version

You can directly access the deployed application at:
[https://pok-mon-explorer-two.vercel.app/](https://pok-mon-explorer-two.vercel.app/)

## 📱 Usage

- The home page displays a grid of Pokémon cards
- Use the search bar at the top to filter Pokémon by name
- Select a type from the dropdown to filter Pokémon by type
- Responsive design adapts to your device screen size

## 🧩 Project Structure

```
pokemon-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonGrid.jsx
│   │   ├── SearchBar.jsx
│   │   └── TypeFilter.jsx
│   ├── hooks/
│   │   └── usePokemonData.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── README.md
```

## 🔄 API Integration

This application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data:
- Endpoint for Pokémon list: `https://pokeapi.co/api/v2/pokemon?limit=150`
- Endpoint for individual Pokémon details: `https://pokeapi.co/api/v2/pokemon/{id or name}`

## 🎨 Styling

The application is styled using TailwindCSS, a utility-first CSS framework. The UI is enhanced with Lucide React icons for a modern and clean look.

## 🌐 Deployment

The application is deployed on Vercel. You can access the live demo at: [https://pok-mon-explorer-two.vercel.app/](https://pok-mon-explorer-two.vercel.app/)


## 🧪 Future Improvements

- Add pagination or infinite scroll for viewing more Pokémon
- Implement detailed view for each Pokémon with more information
- Add more filtering options (stats, abilities, etc.)
- Implement dark/light theme toggle
- Add user authentication for saving favorite Pokémon