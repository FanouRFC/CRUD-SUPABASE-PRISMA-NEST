import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, type ChangeEvent } from "react";
import type { user } from "../types/tableType";
import { userApi } from "@/api/user.api";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";

export default function UserForm() {
  const [userData, setUserData] = useState<Omit<user, "id">>({
    email: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function reset() {
    setUserData({
      email: "",
      name: "",
    });
  }

  async function addUser() {
    try {
      setIsLoading(true);
      const api = await userApi.addUser(userData);
      setIsLoading(false);
      navigation("/user");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3 border p-5 border-b rounded-lg">
        <div>
          <p className="text-3xl font-medium text-center">Ajout user</p>
        </div>
        <div>
          <p>name</p>
          <Input
            placeholder="Jordan Lee"
            name="name"
            value={userData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <p>email</p>
          <Input
            placeholder="Jordan@gmail.com"
            type="email"
            name="email"
            value={userData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        {isLoading ? (
          <div className="flex gap-3">
            <Button className="cursor-pointer bg-white text-black w-50 rounded self-end">
              Reinitialiser
            </Button>
            <div className="flex justify-center">
              <Button className="cursor-pointer bg-blue-500 w-50 rounded self-end">
                <Spinner />
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              className="cursor-pointer bg-white text-black w-50 rounded self-end"
              onClick={() => {
                reset();
              }}
            >
              Reinitialiser
            </Button>
            <Button
              className="cursor-pointer bg-blue-500 w-50 rounded self-end"
              onClick={async () => {
                await addUser();
              }}
            >
              Confirmer
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
