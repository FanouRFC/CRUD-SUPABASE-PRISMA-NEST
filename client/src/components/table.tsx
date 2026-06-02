import type { post, user } from "../types/tableType";

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
              </tr>
            );
          }

          const p = item as post;
          return (
            <tr key={p.id}>
              <td className="border px-2">{p.id}</td>
              <td className="border px-2">{p.title}</td>
              <td className="border px-2">{p.author?.name ?? ""}</td>
              <td className="border px-2">{p.published ? "Oui" : "Non"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
