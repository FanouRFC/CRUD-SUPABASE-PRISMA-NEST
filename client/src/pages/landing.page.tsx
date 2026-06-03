import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div>
      <p>Heelllo</p>
      <Link to="/user">
        <Button className="rounded-md cursor-pointer">User</Button>
      </Link>
      <Link to="/post">
        <Button className="rounded-md cursor-pointer">Post</Button>
      </Link>
    </div>
  );
}
