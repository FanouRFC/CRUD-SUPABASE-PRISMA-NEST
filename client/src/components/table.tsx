import type { post, user } from "../types/tableType";
import { Trash, SquarePen } from "lucide-react";

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
    <table className="table-fixed border-collapse ">
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
                <td className="border px-2 ">
                  <div className="flex flex-row gap-1">
                    <Trash className="cursor-pointer" />
                    <SquarePen className="cursor-pointer" />
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
              <td className="border px-2 flex">
                <div className="flex flex-row gap-1">
                  <Trash className="cursor-pointer" />
                  <SquarePen className="cursor-pointer" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
