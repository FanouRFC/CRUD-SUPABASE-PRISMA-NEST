import MyTable from "@/components/table";
import { useEffect, useState, type ChangeEvent } from "react";
import type { user } from "../types/tableType";
import { userApi } from "@/api/user.api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function UserPage() {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<user[]>([]);
  async function getUser() {
    var data: any = [];
    if (search) {
      data = await userApi.getUserByName(search);
    } else {
      data = await userApi.getUsers();
    }
    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, [search]);

  return (
    <div className="w-full">
      <p className="text-4xl font-medium text-center">User</p>
      <div className="flex flex-col gap-5">
        <div className="flex items-center relative">
          <Search className="absolute left-2" />
          <Input
            type="text"
            placeholder="recherche par nom"
            className="w-75 border border-b rounded-lg ps-10"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <MyTable
          header={["id", "name", "email", "actions"]}
          contentType="user"
          content={user}
        />
      </div>
    </div>
  );
}
