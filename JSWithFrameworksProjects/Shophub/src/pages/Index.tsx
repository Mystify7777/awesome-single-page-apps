import { CartProvider } from "@/contexts/CartContext";
import { Store } from "./Store";

const Index = () => {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  );
};

export default Index;
