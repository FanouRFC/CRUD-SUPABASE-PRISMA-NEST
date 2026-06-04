import { postApi } from "@/api/post.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, type BaseUIEvent } from "@base-ui/react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

type postForm = {
  authorId: number;
  content: string;
  title: string;
};

type postApiData = {
  authorId: number;
  content: string;
  title: string;
  published: boolean;
};

export default function PostForm() {
  const [postData, setPostData] = useState<postForm>({
    authorId: 0,
    content: "",
    title: "",
  });
  const [radio, setRadio] = useState<string>("not_published");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: name === "authorId" ? Number(value) : value,
    }));
  }

  async function handleRadioChange(
    e: BaseUIEvent<ChangeEvent<HTMLInputElement, Element>>,
  ) {
    setRadio(e.target.value);
  }

  function reset() {
    setPostData({
      authorId: 0,
      content: "",
      title: "",
    });
    setRadio("");
  }

  async function addPost() {
    try {
      setIsLoading(true);
      var data: postApiData = {
        published: radio == "published" ? true : false,
        authorId: postData.authorId,
        content: postData.content,
        title: postData.title,
      };
      console.log(data);
      const api = await postApi.addPost(data);
      setIsLoading(false);
      navigation("/post");
    } catch (error) {
      setIsLoading(false);
      setError("L'id de l'author n'existe pas");
      console.log(error);
    }
  }

  return (
    <form className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3 border p-5 border-b rounded-lg">
        <div>
          <p className="text-3xl font-medium text-center">Ajout post</p>
        </div>
        {error && (
          <div className="bg-[#FF5449] text-white rounded-md p-3">
            <p className="text-center">{error}</p>
          </div>
        )}
        <div>
          <p>Author</p>
          <Input
            type="number"
            placeholder="Jordan Lee"
            name="authorId"
            value={postData.authorId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <p>title</p>
          <Input
            placeholder="Jordan Lee"
            name="title"
            value={postData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <p>content</p>
          <Input
            placeholder="Jordan Lee"
            name="content"
            value={postData.content}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p>published</p>
          <RadioGroup
            name="published"
            defaultValue="not_published"
            value={radio}
            onChange={(
              e: BaseUIEvent<ChangeEvent<HTMLInputElement, Element>>,
            ) => {
              handleRadioChange(e);
            }}
            required
            className="w-fit"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="published" id="r2" />
                <Label htmlFor="r2">Publié</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="not_published" id="r3" />
                <Label htmlFor="r3">Non publié</Label>
              </div>
            </div>
          </RadioGroup>
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
              onClick={() => reset()}
            >
              Reinitialiser
            </Button>
            <Button
              className="cursor-pointer bg-blue-500 w-50 rounded self-end"
              onClick={async () => {
                await addPost();
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
