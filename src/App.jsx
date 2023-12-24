import Cart from "./Cart";
import CheckOut from "./CheckOut";
import Header from "./Header";
import Meals from "./Meals";
import { CartContextPrivider } from "./Store/CartContex";
import { UserProgressCTXProvider } from "./Store/UserProgressContex";

function App() {
  return (
    <>
    <UserProgressCTXProvider>
<CartContextPrivider>
    <Header/>
     <Meals/>
     <Cart />
     <CheckOut/>
     </CartContextPrivider>
     </UserProgressCTXProvider>
    </>
  );
}

export default App;
