import type { post, user } from "../types/tableType";
import { Trash, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@base-ui/react";
import { postApi } from "@/api/post.api";
import { userApi } from "@/api/user.api";

type MyTableProps = {
  header: string[];
  contentType: "user" | "post";
  content: user[] | post[];
};

export default function MyTable({
  header,
  contentType,
  content,
}: MyTableProps) {
  return (
    <table className="table-auto border-collapse w-full ">
      <thead>
        <tr>
          {header.map((el) => (
            <th className="border">{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((item) => {
          if (contentType === "user") {
            const u = item as user;
            return (
              <tr key={u.id}>
                <td className="border px-2">{u.id}</td>
                <td className="border px-2">{u.name}</td>
                <td className="border px-2">{u.email}</td>
                <td className="border px-2 flex justify-center">
                  <div className="flex flex-row gap-1">
                    <DialogEdit type={contentType} />
                    <DialogDelete type={contentType} id={parseInt(u.id)} />
                  </div>
                </td>
              </tr>
            );
          }

          const p = item as post;
          return (
            <tr key={p.id}>
              <td className="border px-2">{p.id}</td>
              <td className="border px-2">{p.title}</td>
              <td className="border px-2">{p.content}</td>
              <td className="border px-2">{p.published ? "Oui" : "Non"}</td>
              <td className="border px-2">{p.author.name ?? ""}</td>
              <td className="border px-2 flex justify-center">
                <div className="flex flex-row gap-1">
                  <DialogEdit type={contentType} />
                  <DialogDelete type={contentType} id={parseInt(p.id)} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

type DialogDeleteProps = {
  type: "user" | "post";
  id: number;
};

export function DialogDelete({ type, id }: DialogDeleteProps) {
  async function deleteData() {
    try {
      if (type == "post") {
        const req = await postApi.deletePost(id);
      } else {
        const req = await userApi.deleteUser(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={"bg-transparent cursor-pointer"}>
            <Trash className=" size-5" color="black" />
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Êtes-vous absolument sûr(e)</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Elle supprimera définitivement vos
            données de nos serveurs.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose
            render={
              <Button
                type="button"
                className="cursor-pointer bg-transparent text-black"
              >
                Fermer
              </Button>
            }
          />
          <DialogClose
            render={
              <Button
                type="button"
                className="cursor-pointer bg-red-400 text-black"
                onClick={async () => {
                  deleteData();
                }}
              >
                Confirmer
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DialogEditProps = {
  type: "user" | "post";
};

export function DialogEdit({ type }: DialogEditProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={"bg-transparent cursor-pointer"}>
            <SquarePen className=" size-5" color="black" />
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Modification {type == "user" ? "user" : "post"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription
          render={
            type == "user" ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p>Name</p>
                  <Input type="text" className={"border border-b rounded-md"} />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Email</p>
                  <Input type="text" className={"border border-b rounded-md"} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p>title</p>
                  <Input type="text" className={"border border-b rounded-md"} />
                </div>
                <div className="flex flex-col gap-2">
                  <p>content</p>
                  <Input type="text" className={"border border-b rounded-md"} />
                </div>
                <div className="flex flex-col gap-2">
                  <p>published</p>
                  <Input type="text" className={"border border-b rounded-md"} />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Author</p>
                  <Input
                    type="text"
                    className={"border border-b rounded-md"}
                    readOnly
                  />
                </div>
              </div>
            )
          }
        ></DialogDescription>

        <DialogFooter className="sm:justify-end">
          <DialogClose
            render={
              <Button
                type="button"
                className="cursor-pointer bg-transparent text-black"
              >
                Fermer
              </Button>
            }
          />
          <DialogClose
            render={
              <Button type="button" className="cursor-pointer bg-blue-500">
                Confirmer
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
