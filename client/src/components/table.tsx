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
import { Input, type BaseUIEvent } from "@base-ui/react";
import { postApi } from "@/api/post.api";
import { userApi } from "@/api/user.api";
import { useEffect, useState, type ChangeEvent } from "react";
import { Spinner } from "./ui/spinner";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
                    <DialogEdit type={contentType} data={u} />
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
                  <DialogEdit type={contentType} data={p} />
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function deleteData() {
    try {
      setIsLoading(true);
      if (type == "post") {
        const req = await postApi.deletePost(id);
        setIsLoading(false);
        window.location.reload();
      } else {
        const req = await userApi.deleteUser(id);
        setIsLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setIsLoading(false);
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
          {isLoading ? (
            <Button
              type="button"
              className="cursor-pointer bg-red-400 text-black"
            >
              <Spinner />
            </Button>
          ) : (
            <Button
              type="button"
              className="cursor-pointer bg-red-400 text-black"
              onClick={async () => {
                deleteData();
              }}
            >
              Confirmer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DialogEditProps =
  | {
      type: "user";
      data: user;
    }
  | {
      type: "post";
      data: post;
    };

export function DialogEdit({ type, data }: DialogEditProps) {
  const [userData, setUserData] = useState<user | undefined>(
    type == "user" ? data : undefined,
  );
  const [postData, setPostData] = useState<post | undefined>(
    type == "post" ? data : undefined,
  );

  const [radioData, setRadioData] = useState<string>(
    postData?.published ? "published" : "not_published",
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (type == "user") {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  }

  async function handleRadioChange(
    e: BaseUIEvent<ChangeEvent<HTMLInputElement, Element>>,
  ) {
    setRadioData(e.target.value);
  }

  async function updateData() {
    if (type === "user") {
      try {
        setIsLoading(true);
        var dataUserApi = {
          name: userData?.name,
          email: userData?.email,
        };
        const api = await userApi.updateUser(parseInt(data.id), dataUserApi);
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      try {
        setIsLoading(true);
        var dataPostApi = {
          title: postData?.title,
          content: postData?.content,
          published: radioData == "published" ? true : false,
        };
        const api = await postApi.updatePost(parseInt(data.id), dataPostApi);
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

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
                  <Input
                    type="text"
                    name="name"
                    className={"border border-b rounded-md"}
                    value={userData?.name ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Email</p>
                  <Input
                    type="text"
                    name="email"
                    className={"border border-b rounded-md"}
                    value={userData?.email ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p>title</p>
                  <Input
                    type="text"
                    name="title"
                    className={"border border-b rounded-md"}
                    value={postData.title ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>content</p>
                  <Input
                    type="text"
                    name="content"
                    className={"border border-b rounded-md"}
                    value={postData?.content ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>published</p>
                  <RadioGroup
                    defaultValue={
                      postData.published ? "published" : "not_published"
                    }
                    value={radioData}
                    onChange={(
                      e: BaseUIEvent<ChangeEvent<HTMLInputElement, Element>>,
                    ) => {
                      handleRadioChange(e);
                    }}
                    required
                    className="w-fit"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="published" id="r2" />
                      <Label htmlFor="r2">Publié</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="not_published" id="r3" />
                      <Label htmlFor="r3">Non publié</Label>
                    </div>
                  </RadioGroup>
                  <Input
                    type="text"
                    name="published"
                    className={"border border-b rounded-md"}
                    value={postData?.published ? "True" : "False"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Author</p>
                  <Input
                    type="text"
                    className={"border border-b rounded-md"}
                    value={postData.author.name}
                    readOnly
                    required
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
          {isLoading ? (
            <Button type="button" className="cursor-pointer bg-blue-500">
              <Spinner />
            </Button>
          ) : (
            <Button
              type="button"
              className="cursor-pointer bg-blue-500"
              onClick={() => {
                updateData();
              }}
            >
              Confirmer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
