import { useState, useEffect,useRef } from 'react';
import { Search } from 'lucide-react';

//TYPES

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

// Main App Component
export default function PokemonExplorer() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [types, setTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filterRef=useRef<HTMLDivElement>(null)

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokémon data');
        
        const data: PokemonListResponse = await response.json();
        
        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (p) => {
            const detailResponse = await fetch(p.url);
            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${p.name}`);
            return await detailResponse.json() as Pokemon;
          })
        );
        
        // Extract all unique types
        const allTypes = new Set<string>();
        pokemonDetails.forEach(p => {
          p.types.forEach(typeInfo => {
            allTypes.add(typeInfo.type.name);
          });
        });
        
        setTypes(Array.from(allTypes).sort());
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter pokemon based on search term and selected type
  useEffect(() => {
    if (pokemon.length === 0) return;
    
    const filtered = pokemon.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || 
        p.types.some(typeInfo => typeInfo.type.name === selectedType);
      
      return matchesSearch && matchesType;
    });
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
  
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setIsFilterOpen(false);
  };

  // Capitalize first letter of a string
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get color based on Pokemon type
  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-blue-600',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type] || 'bg-gray-400';
  };

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-row items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Pokémon Explorer</h1>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-row gap-4 items-center">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 rounded-full bg-red-700 text-white placeholder-red-200 border-none focus:outline-none focus:ring-2 focus:ring-red-300 w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-red-300" size={18} />
              </div>
            </div>
            
            <div className="relative" ref={filterRef}>
              <button 
                onClick={toggleFilter}
                className="px-4 py-2 rounded-full bg-red-700 text-white flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21M10 12H21M16 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {selectedType ? capitalize(selectedType) : "All Types"}
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 w-48">
                  <div 
                    className="px-4 py-2 cursor-pointer text-black hover:bg-gray-200"
                    onClick={() => handleTypeChange('')}
                  >
                    All Types
                  </div>
                  {types.map(type => (
                    <div 
                      key={type} 
                      className={`px-4 py-2 cursor-pointer text-red-500 ${type === selectedType ? 'bg-blue-500 text-black' : 'hover:bg-gray-900'}`}
                      onClick={() => handleTypeChange(type)}
                    >
                      {capitalize(type)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-24 pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Loading Pokémon data...</p>
          </div>
        ) : filteredPokemon.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-xl text-gray-700 mb-2">No Pokémon found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">{capitalize(p.name)}</h2>
                    <span className="text-gray-500 font-medium">#{p.id.toString().padStart(3, '0')}</span>
                  </div>
                </div>
                
                <div className="flex justify-center p-4 bg-gray-100">
                  <img 
                    src={p.sprites.front_default} 
                    alt={p.name}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {p.types.map((typeInfo) => (
                      <span 
                        key={typeInfo.type.name} 
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(typeInfo.type.name)}`}
                      >
                        {capitalize(typeInfo.type.name)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">PokeAPI</a></p>
        </div>
      </footer>
    </div>
  );
}