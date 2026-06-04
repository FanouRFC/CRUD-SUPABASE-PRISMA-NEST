import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PostForm() {
  return (
    <form className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3 border p-5 border-b rounded-lg">
        <div>
          <p className="text-3xl font-medium text-center">Ajout post</p>
        </div>
        <div>
          <p>Author</p>
          <Input placeholder="Jordan Lee" />
        </div>
        <div>
          <p>title</p>
          <Input placeholder="Jordan Lee" />
        </div>
        <div>
          <p>content</p>
          <Input placeholder="Jordan Lee" />
        </div>

        <div>
          <p>published</p>
          <Input placeholder="Jordan Lee" />
        </div>
        <div>
          <Button className="cursor-pointer bg-white text-black w-50 rounded self-end">
            Reinitialiser
          </Button>
          <Button className="cursor-pointer bg-blue-500 w-50 rounded self-end">
            Confirmer
          </Button>
        </div>
      </div>
    </form>
  );
}
