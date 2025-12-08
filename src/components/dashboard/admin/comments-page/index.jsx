"use client";
import CommentItem from "@/components/elements/comment-item";
import GlobalLoading from "@/components/elements/global-loading";
import Pagination from "@/components/elements/pagination";
import { setDashboardActiveItem } from "@/features/globalSlice";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(-1);
  const path = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(
      setDashboardActiveItem({
        title: "دیدگاه ها",
        link: "comments",
      })
    );
  }, [path]);
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/comment/adminGetAll?page=${currentPage}&limit=${commentPerPage}`
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data?.data);
        setComments(data?.data?.sendComments);
        setTotalPages(data?.data?.totalPages);
        setTotalComments(data?.data?.totalComments || 0);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, commentPerPage, reload]);
  // useEffect برای فراخوانی API
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="w-full p-4">
      {loading ? (
        <GlobalLoading />
      ) : (
        <div className="w-full flex flex-col gap-3 py-2 md:p-4">
          {comments?.length === 0 ? (
            <div className="pb-4 text-sm text-gray-500">دیدگاهی وجود ندارد</div>
          ) : comments?.length > 0 ? (
            comments.map((item) => (
              <CommentItem
                key={item?._id}
                item={item}
                comments={comments}
                setComments={setComments}
              />
            ))
          ) : (
            <div className="pb-4 text-sm text-gray-500">
              دیدگاهی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      )}

      <Pagination
        items={comments}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CommentsPage;
