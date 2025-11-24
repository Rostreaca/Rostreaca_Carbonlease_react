import { useState, useEffect } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle"
import PageContent from "../../Common/PageContent/PageContent"
import { BoardForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./BoardInsertForm.styles";
import RegionSelect from "./components/RegionSelect";
import CategorySelect from "./components/CategorySelect";
import TextInputSection from "./components/TextInputSection";
import { useNavigate } from "react-router-dom";
import { BoardInsertForm } from "../../../api/board/boardAPI";
import axios from "axios";

const BoardInsertForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [regionNo, setRegionNo] = useState("");
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if(!token){
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login");
      return;
    }

    if(!title) return alert("제목을 입력해주세요!");
    if(!content) return alert("내용을 입력해주세요!");
    if(!regionNo || !category) return alert("지역 or 탄소절감 카테고리를 선택해주세요!");

    const accessToken = localStorage.getItem("accessToken");

    const board = {
      title,
      content,
      lat,
      lng,
      certificationNo: category,
      regionNo,
    };

    try{
      const res = BoardInsertForm(board, accessToken);
      const boardNo = res.data.boardNo;

      navigate(`/boards/${boardNo}`);
      alert("등록 성공!");
    } catch(err) {
      console.error(err);
      alert("등록 실패!");
    }

  };

  return (
    <>
      <PageTitle
        title="일반 게시글 작성"
        breadcrumbs={[
          { label: 'Home', path: '/'},
          { label: '일반게시판', path: '/boards'},
          { label: '일반 게시글 작성', current: true }
        ]}
        />

        <PageContent>
          <FormArea>
            <BoardForm onSubmit={handleSubmit}>
            <TextInputSection 
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />

            <hr />

            <SelectRow>
              <SelectLabel>활동 선택
              <CategorySelect value={category} onChange={setCategory}/>
              </SelectLabel>

              <SelectLabel>지역 선택
              <RegionSelect value={regionNo} onChange={setRegionNo}/>
              </SelectLabel>
            </SelectRow>
            

            <hr />
            <ButtonSection>
            <button type="submit">등록</button>
            <button type="button" onClick={() => window.history.back()}>취소</button>
            </ButtonSection>
            </BoardForm>
          </FormArea>
        </PageContent>
    </>
  )
}

export default BoardInsertForm;