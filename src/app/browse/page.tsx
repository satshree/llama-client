import Header from "@/components/store/Header";

import style from "./browse.module.css";
import QueryBox from "@/components/store/QueryBox";

function Browse() {
  return (
    <>
      <Header />
      <QueryBox />
      <div className={style.page}>
        <div>hello</div>
      </div>
    </>
  );
}

export default Browse;
