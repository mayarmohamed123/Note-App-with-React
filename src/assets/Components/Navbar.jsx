import { Button } from "@heroui/react";
import { Leaf, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../../Context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-green-50 via-green-100 to-green-200 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-900">Peaceful Notes</h1>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="bordered"
          onClick={logout}
          className="flex items-center gap-2 rounded-xl border-green-300 text-green-700 hover:bg-green-200 hover:text-green-900 transition-all duration-300">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
