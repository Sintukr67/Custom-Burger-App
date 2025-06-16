import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import MenuView from './components/MenuView';
import BurgerBuilder from './components/BurgerBuilder';
import Cart from './components/Cart';

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'menu':
        return <MenuView />;
      case 'builder':
        return <BurgerBuilder />;
      default:
        return <MenuView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onCartToggle={() => setIsCartOpen(true)}
      />
      
      <main className="pb-8">
        {renderCurrentView()}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;