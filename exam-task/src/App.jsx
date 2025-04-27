import './App.css'
import ProductList from './components/ProductList/ProductList'
import { ToggleProvider } from './context/context'

function App() {

  return (
    <>
      <ToggleProvider>
        <ProductList />
      </ToggleProvider>
    </>
  )
}

export default App
