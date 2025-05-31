import InputTextSection from "@/components/elements/input-text-section";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const NewCategory = ({
  showNewCat,
  setShowNewCat,
  catToEdit,
  setCatToEdit,
  reload,
  setReload,
}) => {
  const [catname, setCatname] = useState("");
  const [catlink, setCatlink] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataMessage, setDataMessage] = useState("");

  const { data: session, status } = useSession();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#newCat")) {
        setCatToEdit({});
        setCatname("");
        setCatlink("");
        setShowNewCat(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    setCatname(catToEdit?.name || "");
    setCatlink(catToEdit?.link || "");
  }, [catToEdit]);

  const addCategory = async () => {
    try {
      setLoading(true);
      if (status === "authenticated") {
        const formdata = {
          name: catname,
          link: catlink,
          creatorInfo: session?.user?.phone,
        };
        const res = await fetch(`/api/category/addCategory`, {
          method: "POST",
          body: JSON.stringify(formdata),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          setCatname("");
          setCatlink("");
          setShowNewCat(false);
          setReload(reload * -1);
        } else {
          setDataMessage(data?.error);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const editCategory = async (id) => {
    try {
      setLoading(true);
      if (status === "authenticated") {
        const formdata = {
          name: catname,
          link: catlink,
          editorInfo: session?.user?.phone,
        };
        const res = await fetch(`/api/category/${id}`, {
          method: "PATCH",
          body: JSON.stringify(formdata),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          setCatname("");
          setCatlink("");
          setShowNewCat(false);
          setReload(reload * -1);
        } else {
          setDataMessage(data?.error);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className={`fixed z-[1] top-0  pt-[240px] lg:pr-[200px] bottom-0 left-0 right-0 flex justify-center items-start   ${
        showNewCat ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div
        id="newCat"
        className="  md:h-72 w-72 sm:w-2/3  bg-slate-50 border rounded-lg shadow-md flex flex-col gap-8 p-4"
      >
        <h3 className="">افزودن دسته بندی</h3>
        <InputTextSection
          id="catname"
          name="catname"
          value={catname}
          type="text"
          setValue={setCatname}
          label={"نام دسته"}
        />

        <InputTextSection
          id="catlink"
          name="catlink"
          value={catlink}
          type="text"
          setValue={setCatlink}
          label={"لینک دسته"}
        />
        <div className="relative pt-6 ">
          <div className="absolute top-0 flex justify-center items-center">
            <span className="text-xs text-rose-600">{dataMessage}</span>
          </div>
          {catToEdit?.name ? (
            <button
              onClick={() => editCategory(catToEdit._id)}
              className="relative  w-36 md:w-40 h-8 md:h-10 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-blue-600 border-blue-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-blue-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base  overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2"
            >
              <span>ویرایش دسته</span>
            </button>
          ) : (
            <button
              onClick={() => addCategory()}
              className="relative  w-36 md:w-40 h-8 md:h-10 font-bold rounded-md isolation-auto z-[1] text-white border-2 bg-blue-600 border-blue-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full
         before:-right-full before:hover:right-0 before:rounded-full  before:bg-blue-950 before:-z-10 
          before:aspect-square before:hover:scale-150 text-sm md:text-base  overflow-hidden before:hover:duration-700
           flex justify-center items-center gap-2 "
            >
              <span>ذخیره دسته</span>
              {loading ? (
                <Image
                  src={"/images/spinner.svg"}
                  alt="spinner"
                  width={25}
                  height={25}
                />
              ) : null}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
