import "./explain.scss";
import { useState } from "react";
import { Menu } from "antd";
import {
  AreaChartOutlined,
  ExceptionOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

// img
import signup1 from "../../explain-img/signup1.png";
import signup2 from "../../explain-img/signup2.png";
import signup3 from "../../explain-img/signup3.png";
import signup4 from "../../explain-img/signup4.png";
import addsurvey1 from "../../explain-img/addsurvey1.png";
import addsurvey2 from "../../explain-img/addsurvey2.png";
import joinsurvey1 from "../../explain-img/joinsurvey1.png";
import joinsurvey2 from "../../explain-img/joinsurvey2.png";
import joinsurvey3 from "../../explain-img/joinsurvey3.png";
import joinsurvey4 from "../../explain-img/joinsurvey4.png";
import editsurvey1 from "../../explain-img/editsurvey1.png";
import editsurvey2 from "../../explain-img/editsurvey2.png";
import editsurvey3 from "../../explain-img/editsurvey3.png";
import surveyresult1 from "../../explain-img/surveyresult1.png";
import surveyresult2 from "../../explain-img/surveyresult2.png";
import account1 from "../../explain-img/account1.png";
import account2 from "../../explain-img/account2.png";
import account3 from "../../explain-img/account3.png";
import account4 from "../../explain-img/account4.png";
import account5 from "../../explain-img/account5.png";
import account6 from "../../explain-img/account6.png";

const Explain = () => {
  const [menu, setMenu] = useState("0");
  return (
    <div className="explain">
      <div className="explain-wrapper">
        <div className="explain-header">
          <Menu
            onClick={(e) => {
              setMenu(e.key);
            }}
            selectedKeys={[menu]}
            mode="horizontal"
          >
            <Menu.Item key="0" className="explain-menu" icon={<UserAddOutlined />}>
              회원가입
            </Menu.Item>
            <Menu.Item key="1" className="explain-menu" icon={<FileAddOutlined />}>
              설문조사 등록 (관리자)
            </Menu.Item>
            <Menu.Item key="2" className="explain-menu" icon={<FileDoneOutlined />}>
              설문조사 참여
            </Menu.Item>
            <Menu.Item key="3" className="explain-menu" icon={<ExceptionOutlined />}>
              설문조사 수정 (관리자)
            </Menu.Item>
            <Menu.Item key="4" className="explain-menu" icon={<AreaChartOutlined />}>
              설문조사 결과 (관리자)
            </Menu.Item>
            <Menu.Item key="5" className="explain-menu" icon={<UserOutlined />}>
              계정 관리
            </Menu.Item>
          </Menu>
        </div>
        {/*설명*/}
        {menu === "0" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. 상단 메뉴의 회원가입 메뉴를 선택</div>
              <div className="text-contents"></div>
              <div className="text-img">
                <img src={signup1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2 - 1. 회원가입 (관리자)</div>
              <div className="text-contents">
                <span className="text-highlight">관리자만 설문조사를 등록할 수 있습니다!</span>
                <br />
                또한, 설문조사에 참여할 수 있습니다.
                <br />
                <span className="text-highlight">회원가입 화면에서 관리자에 꼭 체크해주세요!</span>
              </div>
              <div className="text-img">
                <img src={signup2} alt="" />
              </div>
              <div className="text-contents">
                관리자 계정으로 로그인했을 경우에만
                <span className="text-highlight">내가 등록한 설문조사, 설문조사 등록</span>
                메뉴를 사용할 수 있습니다.
              </div>
              <div className="text-img">
                <img src={signup4} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2 - 2. 회원가입 (사용자)</div>
              <div className="text-contents">
                <span className="text-highlight">관리자가 아닌 사용자는 설문조사에 참여만 할 수 있습니다!</span>
                <br />
                <span className="text-highlight">회원가입 화면에서 관리자에 체크하지 말아주세요!</span>
              </div>
              <div className="text-img">
                <img src={signup3} alt="" />
              </div>
              <div className="text-contents">
                관리자가 아닌 사용자로 로그인 했을 경우에는
                <span className="text-highlight">내가 등록한 설문조사, 설문조사 등록</span>메뉴가 나타나지 않습니다.
              </div>
              <div className="text-img">
                <img src={signup1} alt="" />
              </div>
            </div>
          </div>
        )}
        {menu === "1" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. 관리자 계정으로 로그인 후 상단의 설문조사 메뉴 선택</div>
              <div className="text-contents">
                <span className="text-highlight">관리자만 설문조사를 등록할 수 있습니다!</span>
              </div>
              <div className="text-img">
                <img src={addsurvey1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2. 설문조사 문항 등록하기</div>
              <div className="text-contents">
                <span className="text-highlight">설문조사 화면 좌측 하단의 문제 추가 버튼</span>을 클릭해서 문항을
                추가할 수 있습니다.
                <br />
                <span className="text-highlight">문항별 우측 상단의 드롭다운 메뉴</span>에서 객관식, 주관식,
                객관식(사진) 유형을 선택할 수 있습니다.
                <br />
                <span className="text-highlight">문항별 우측 하단의 삭제하기 버튼</span>으로 문항을 삭제할 수 있습니다.
                <br />
                <span className="text-highlight">객관식, 객관식(사진) 유형의 문항 좌측 하단의 보기추가 버튼</span>으로
                보기를 추가할 수 있습니다.
                <br />
                <span className="text-highlight">객관식, 객관식(사진) 유형의 보기 옆 X 버튼</span>을 클릭해서 보기를
                삭제할 수 있습니다.
                <br />
              </div>
              <div className="text-img">
                <img src={addsurvey2} />
              </div>
            </div>
          </div>
        )}
        {menu === "2" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. 로그인 후 상단의 설문조사 목록 메뉴 선택</div>
              <div className="text-contents">
                <span className="text-highlight">관리자와 사용자 모두 </span>
                설문조사에 참여할 수 있습니다!
              </div>
              <div className="text-img">
                <img src={joinsurvey1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2. 참여할 설문조사 선택!</div>
              <div className="text-contents">설문조사 목록에서 원하는 설문조사를 클릭하세요.</div>
              <div className="text-img">
                <img src={joinsurvey2} />
              </div>
              <div className="text-contents">
                <span className="text-highlight">설문조사 모든 문항에 응답</span> 후 제출해주세요!
              </div>
              <div className="text-img">
                <img src={joinsurvey3} />
              </div>
            </div>
            <div className="text">
              <div className="text-title">
                설문조사에 <u>복수 응답은 불가능</u>합니다!
              </div>
              <div className="text-contents">
                <span className="text-highlight">이미 참여한 설문조사에 다시 참여할 수 없습니다!</span>
              </div>
              <div className="text-img">
                <img src={joinsurvey4} />
              </div>
            </div>
          </div>
        )}
        {menu === "3" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. 관리자 계정으로 로그인 후 상단의 내가 등록한 설문조사 메뉴 선택</div>
              <div className="text-contents">
                <span className="text-highlight">관리자만 </span>
                내가 등록한 설문조사 메뉴를 사용하실 수 있습니다.
              </div>
              <div className="text-img">
                <img src={editsurvey1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2. 수정할 설문조사 선택</div>
              <div className="text-contents">내가 등록한 설문조사 목록에서 수정하실 설문조사를 선택하세요!</div>
              <div className="text-img">
                <img src={joinsurvey2} />
              </div>
              <div className="text-contents">
                상단의 <span className="text-highlight">수정하기 메뉴</span> 선택!
              </div>
              <div className="text-img">
                <img src={editsurvey2} />
              </div>
            </div>
            <div className="text">
              <div className="text-title"></div>
              <div className="text-contents">
                설문 조사를 등록할 당시의 화면이 나타납니다.
                <br />
                <span className="text-highlight">우측 하단의 삭제하기 버튼</span>을 클릭하면 등록한 설문조사와 모든 응답
                결과가 삭제됩니다!
                <br />
                <span className="text-highlight">우측 하단의 수정하기 버튼</span>을 클릭해서 설문조사를 수정할 수
                있습니다.
                <br />
                만약, 설문조사를 수정하면 설문조사의{" "}
                <span className="text-highlight">응답 결과가 모두 사라집니다!</span>
              </div>
              <div className="text-img">
                <img src={editsurvey3} />
              </div>
            </div>
          </div>
        )}
        {menu === "4" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. 관리자 계정으로 로그인 후 상단의 내가 등록한 설문조사 메뉴 선택</div>
              <div className="text-contents">
                <span className="text-highlight">관리자만 </span>
                내가 등록한 설문조사 메뉴를 사용하실 수 있습니다.
              </div>
              <div className="text-img">
                <img src={editsurvey1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2. 결과를 확인할 설문조사 선택</div>
              <div className="text-contents">내가 등록한 설문조사 목록에서 결과를 확인할 설문조사를 선택하세요!</div>
              <div className="text-img">
                <img src={joinsurvey2} />
              </div>
              <div className="text-contents">
                상단의 <span className="text-highlight">통계보기</span> 선택!
              </div>
              <div className="text-img">
                <img src={surveyresult1} />
              </div>
            </div>
            <div className="text">
              <div className="text-title"></div>
              <div className="text-contents">
                설문조사의 <span className="text-highlight">결과를 한눈</span>에 확인할 수 있습니다!
                <br />
              </div>
              <div className="text-img">
                <img src={surveyresult2} />
              </div>
            </div>
          </div>
        )}
        {menu === "5" && (
          <div className="explain-content">
            <div className="text">
              <div className="text-title">1. (비밀번호 찾기) 우측 상단의 로그인 메뉴 선택</div>
              <div className="text-contents"></div>
              <div className="text-img">
                <img src={account1} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">
                1 - 2. 로그인 화면의 <span style={{ color: "blue" }}>Forget Password?</span> 클릭
              </div>
              <div className="text-contents"></div>
              <div className="text-img">
                <img src={account2} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">1 - 3. 이메일 입력</div>
              <div className="text-contents">
                <span className="text-highlight">회원가입시 사용한 이메일을 입력하세요</span>
              </div>
              <div className="text-img">
                <img src={account3} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">1 - 4. 이메일 확인하기</div>
              <div className="text-contents">
                이메일로 새로운 비밀번호가 발송됩니다
                <br />
                이메일을 확인해주세요
              </div>
              <div className="text-img">
                <img src={account4} alt="" />
              </div>
            </div>
            <hr />
            <div className="text">
              <div className="text-title">2. (비밀번호 변경) 로그인 후 상단의 내정보 메뉴 선택</div>
              <div className="text-contents"></div>
              <div className="text-img">
                <img src={account5} alt="" />
              </div>
            </div>
            <div className="text">
              <div className="text-title">2 - 1. 비밀번호 수정하기</div>
              <div className="text-contents"></div>
              <div className="text-img">
                <img src={account6} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Explain;
